const express=require("express")
const RequestRouter=express.Router()
const {UserAuth}=require("../middlwares/auth.js")
const {ConnectionRequestModel}=require("../models/sendconnection.js")
const{UserModel}=require("../models/user.js")
RequestRouter.post("/SendConnection/:status/:touserid",UserAuth,async(req,res)=>{
    try{

    const Allowed_status=["ignored","intersted"]
    const FromUserId=req.User._id
    const ToUserid=req.params.touserid
    const Status=req.params.status
    
    if(!Allowed_status.includes(Status)){
        return res.status(400).json({message:"Invalid Status request",
            Status

        })
    }

   if(FromUserId==ToUserid){
    return res.status(400).json({message:
        "cannot send request with yourself"})
   }
    const ExistId=await UserModel.findById(ToUserid)
      if(!ExistId){
        return res.status(400).json({message:"User not found"})
    }

    const ExistingRequest=await ConnectionRequestModel.findOne({
        $or:[
            {FromUserId:ToUserid},
            {ToUserid:FromUserId}
            
        ]
    })
    if (ExistingRequest){
        return res.status(400).json({message:"alredy connection request exist"})
    }
    

  
    const data=new ConnectionRequestModel({
        FromUserId,ToUserid,Status
    })


const SaveRequstDetail=await data.save()
res.json({
    message:`${ req.User.FirstName} is ${Status}  to send a connection request ${ExistId.FirstName}`  ,SaveRequstDetail
})

}catch(err){
    res.send(err.message)
}
})

RequestRouter.post("/Reviewrequest/:status/:fromuserid", UserAuth, async (req, res) => {
  try {
    const LoggedPerson = req.User;
    const AllowedReviewedStatus = ["accepted", "rejected"];
    const ToUserStatus = req.params.status;
    const FromUserId = req.params.fromuserid;

    // check if status is valid
    if (!AllowedReviewedStatus.includes(ToUserStatus)) {
      return res.status(400).json({
        message: "invalid status type",
        ToUserStatus
      });
    }

    // ✅ only the receiver can review
    const VerifyId = await ConnectionRequestModel.findOne({
      FromUserId: FromUserId,
      ToUserid: LoggedPerson._id,
      Status: "intersted"   // match schema spelling
    });

    if (!VerifyId) {
      return res.status(400).json({
        message: "Connection request not found"
      });
    }

    // update status
    VerifyId.Status = ToUserStatus;
    const ReviewData = await VerifyId.save();

    res.json({
      message: "status updated successfully",
      ReviewData
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports={RequestRouter}
// Shravn@200ds5