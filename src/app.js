const express=require("express")
const app=express()
const {UserModel}=require("./models/user")
const {conncectdb}=require("./config/database")
app.use("/",express.json())

app.post("/signup",async(req,res)=>{




    const UserObj= new UserModel(req.body)
    try{
    await UserObj.save()
    res.send("Signup Succesfully")
    }catch(err){
        res.status(400).send("User Failed to signup",err.message)
    }
})






conncectdb()
console.log("data base is connected succesfully")

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})