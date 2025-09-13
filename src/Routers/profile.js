const express=require("express")
const ProfileRouter=express.Router()
const {UserAuth}=require("../middlwares/auth.js")
const {ValidateProfileEditData}=require("../utils/validation.js")

ProfileRouter.get("/profile/view", UserAuth,async(req, res) => {
    try {
       const UserData=req.User
        res.send(UserData)
       
    } catch (err) {
        console.log(err.message);
        res.status(403).send("Invalid or expired token");
    }
});

ProfileRouter.patch("/profile/edit",UserAuth,async(req,res)=>{
    try{
    const ValidateEProfileEdit=ValidateProfileEditData(req)
    if (!ValidateEProfileEdit){
        throw new Error("Inavalid Edit requets")
    }
    const LoggedInUser=  req.User
    console.log(LoggedInUser)
    Object.keys(req.body).forEach((key)=>(LoggedInUser[key]=req.body[key]))
     await LoggedInUser.save()
     res.json({message:`${LoggedInUser.FirstName} your profile updated succesfully`,
                 data:LoggedInUser}) 

    

    
    }catch(err){
        res.status(400).send(err.message)

    }

})
module.exports={ProfileRouter}