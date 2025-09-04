const express=require("express")
const RequestRouter=express.Router()
const {UserAuth}=require("../middlwares/auth.js")

RequestRouter.post("/SendConnection",UserAuth,(req,res)=>{
    const User=req.User

   console.log("connnection is sent by",User.FirstName)
   res.send("done")
})
module.exports={RequestRouter}