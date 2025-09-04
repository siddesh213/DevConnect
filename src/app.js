const express=require("express")
const app=express()
const validator=require("validator")
const {UserModel}=require("./models/user")
const {conncectdb}=require("./config/database")
const { trusted } = require("mongoose")
const {ValidateSignupData}=require("./utils/validation")
const bcrypt=require("bcrypt")
const cookie_parser=require("cookie-parser")

const {UserAuth}=require("./middlwares/auth.js")
console.log("UserAuth is:", UserAuth);

app.use(express.json())
app.use(cookie_parser())

// Save User Data Into Your DataBase
app.post("/signup",async(req,res)=>{
    try{
    ValidateSignupData(req)
    const {FirstName,LastName,EmailId,PassWord}=req.body
    const saltRounds=10
    const hashPassword=await bcrypt.hash(PassWord,saltRounds)
    // console.log(hashPassword)
    
    const UserObj= new UserModel({FirstName,LastName,EmailId,PassWord:hashPassword})
    
    await UserObj.save()
    res.send("Signup Succesfully")
    }catch(err){
        console.log(err.message)
        res.status(400).send(err.message)
    }
})



app.post("/login",async(req,res)=>{
    try{
    
    const  {EmailId,PassWord}=req.body

    const Find_Email=await  UserModel.findOne({EmailId:EmailId})
    if(!Find_Email){
        res.status(404).send(" invalid credentials")
}
    const Find_Passoword=await Find_Email.VerifyPassword(PassWord)
    if(!Find_Passoword){
        res.status(404).send(" invalid credentials")
    }

    const token= await Find_Email.getJWT();
   
    res.cookie("token", token, { httpOnly: true });

    res.status(200).send("login succesfully");
    

}catch(err){
    console.log(err.message)
    res.send("Error",err.message)
}
})

app.get("/profile", UserAuth,async(req, res) => {
    try {
       const UserData=req.User
        res.send(UserData)
       
    } catch (err) {
        console.log(err.message);
        res.status(403).send("Invalid or expired token");
    }
});

app.post("/SendConnection",UserAuth,(req,res)=>{
    const User=req.User

   console.log("connnection is sent by",User.FirstName)
   res.send("done")
})





conncectdb()
console.log("data base is connected succesfully")

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})