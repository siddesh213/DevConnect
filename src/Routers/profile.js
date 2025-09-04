const express=require("express")
const ProfileRouter=express.Router()
const {UserAuth}=require("../middlwares/auth.js")
ProfileRouter.get("/profile", UserAuth,async(req, res) => {
    try {
       const UserData=req.User
        res.send(UserData)
       
    } catch (err) {
        console.log(err.message);
        res.status(403).send("Invalid or expired token");
    }
});



module.exports={ProfileRouter}