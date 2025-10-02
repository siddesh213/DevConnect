const express=require("express")
const authRouter=express.Router()
const {UserModel}=require("../models/user")
const {ValidateSignupData}=require("../utils/validation")
const bcrypt=require("bcrypt")
// Save User Data Into Your DataBase
authRouter.post("/signup",async(req,res)=>{
    try{
    ValidateSignupData(req)
    const {FirstName,LastName,EmailId,PassWord,Age}=req.body
    const saltRounds=10
    const hashPassword=await bcrypt.hash(PassWord,saltRounds)
    // console.log(hashPassword)
    
    const UserObj= new UserModel({FirstName,LastName,EmailId,Age,PassWord:hashPassword})
    
    await UserObj.save()
    res.send("Signup Succesfully")
    }catch(err){
        console.log(err.message)
        res.status(400).send(err.message)
    }
})


authRouter.post("/login",async(req,res)=>{
    try{
    
    const  {EmailId,PassWord}=req.body

    const Find_Email=await  UserModel.findOne({EmailId:EmailId})
    if(!Find_Email){
         return res.status(404).send(" invalid credentials")
}
    const Find_Passoword=await Find_Email.VerifyPassword(PassWord)
    if(!Find_Passoword){
         return res.status(404).send(" invalid credentials")
    }

    const token= await Find_Email.getJWT();
   
    res.cookie("token", token, { httpOnly: true });

    res.status(200).send("login succesfully");
    

}catch(err){
    console.log(err.message)
    res.send("Error",err.message)
}
})


authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null ,{expires:new Date (Date.now())})
     res.send("logout succesfully")
})


module.exports={authRouter}

//~