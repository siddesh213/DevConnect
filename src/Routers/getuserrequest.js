const express=require("express")
const {UserAuth}=require("../middlwares/auth.js")
const {ConnectionRequestModel}=require("../models/sendconnection.js")
const getuserrequest=express.Router()
const {UserModel}=require("../models/user")
getuserrequest.get("/connection/request/recevied",UserAuth,async(req,res)=>{
    try{
        const LoggedInUser=req.User
        const findAllRequest=await ConnectionRequestModel.find({
            ToUserid:LoggedInUser._id,
            Status:"intersted"
        

        }).populate("FromUserId",["FirstName","LastName","Skills"])
        res.json({
            message:"All the requests you have recevied",
            findAllRequest
        })

 

    }
    catch(err){
        res.status(400).send("ERROR",err.message)
    }
})


getuserrequest.get("/connection/accepted", UserAuth, async (req, res) => {
  try {
    const loggedPearson = req.User;

    const Getallconnections = await ConnectionRequestModel.find({
      $or: [
        { FromUserId: loggedPearson._id, Status: "accepted" },
        { ToUserid: loggedPearson._id, Status: "accepted" },
      ],
    })
      .populate("FromUserId", ["FirstName", "Skills"])
      .populate("ToUserid", ["FirstName", "Skills"]);

    // Use map to get only the friend (other user)
    const friends = Getallconnections.map(row => {
      if (row.FromUserId._id.toString() === loggedPearson._id.toString()) {
        return row.ToUserid; // friend is the receiver
      }
      return row.FromUserId; // friend is the sender
    });

    res.json({
      message: "find all your connections",
      friends
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


getuserrequest.get("/feed",UserAuth,async(req,res)=>{
  try{
    const logPearson=req.User
    const page=parseInt(req.query.page)||1
    let limit=parseInt(req.query.limit)||10
    
    if (limit>20){
      limit=10
    }
    const skip=(page-1)*limit

    const getallconnectedpearsons=await ConnectionRequestModel.find({
      $or: [{
        FromUserId:logPearson._id},{ToUserid:logPearson._id}]
   } ).select(["FromUserId","ToUserid"])
   const hideUser=new Set()
   getallconnectedpearsons.forEach((req )=> {
    hideUser.add(req.FromUserId.toString())
    hideUser.add(req.ToUserid.toString())
   });
  //  console.log(hideUser)
  const ShowUser=await  UserModel.find(
    { $and:[
    {_id:{$nin:Array.from(hideUser)}},{_id:{$ne:logPearson}}]
  }).select(["FirstName","LastName","About","Skills"]).skip(skip).limit(limit)
  // console.log(ShowUser)
  
   res.json({message:ShowUser})

  }catch(err){
    // console.log(err.message)
    res.status(400).send("ERROR:"+err.message)
  }
})
module.exports={getuserrequest}