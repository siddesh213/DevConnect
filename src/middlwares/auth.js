


const jwt=require("jsonwebtoken")
const {UserModel}=require("../models/user")
const UserAuth=async(req,res,next)=>{
    try{
    const token=req.cookies.token
    if (!token){
        throw new Error("Please login")
    }
    const Decodeobj=jwt.verify(token,"DevConnector@2004")
    
  
   const {User_Id}=Decodeobj
    const User=await UserModel.findById(User_Id)
    if (!User){
        throw new Error("User not found")
    }
     req.User=User
     console.log(req.User)
       
    next();
   
    }catch(err){
       res.status(400).send("ERROR:" +err.message)
        
    }




}
module.exports={UserAuth}