const express=require("express")
const app=express()
const validator=require("validator")
const {UserModel}=require("./models/user")
const {conncectdb}=require("./config/database")
const { trusted } = require("mongoose")
const {ValidateSignupData}=require("./utils/validation")
const bcrypt=require("bcrypt")
app.use("/",express.json())

// Save User Data Into Your DataBase
app.post("/signup",async(req,res)=>{
    try{
    ValidateSignupData(req)
    const {FirstName,LastName,EmailId,PassWord}=req.body
    const saltRounds=10
    const hashPassword=await bcrypt.hash(PassWord,saltRounds)
    console.log(hashPassword)
    
    const UserObj= new UserModel({FirstName,LastName,EmailId,PassWordhashPassword})
    
    await UserObj.save()
    res.send("Signup Succesfully")
    }catch(err){
        console.log(err.message)
        res.status(400).send(err.message)
    }
})

       

    
    






// Get The Data From Your DataBase


app.get("/user",async(req,res)=>{
    try{
    const  UserData=await UserModel.find({FirstName:req.body.FirstName})
    // console.log(UserData)
    // 
    if (!UserData || UserData.length===0){
        res.send("User not Found")
    }else{
        res.send(UserData)
    }
    

    

  

    } catch(err){
        res.send("Something Went Wrong")
    }
})


app.delete("/userdata",async(req,res)=>{
    const UserDelete=await UserModel.deleteOne({FirstName:req.body.FirstName})
    try{

        if(UserDelete.deletedCount== 0){
            res.send("your user is not in database")
        }else{
        res.json(UserDelete)
        }


    }catch(err){
        console.log(err.message)
        res.status(400).send("User not found")
    }


})



// Exple Express.js route for updating a user's email
app.patch("/update/:id", async (req, res) => {
   

    try {
         const allowedFields = [ "Age", "PhotoUrl", "Skills","About",];
        const updates = req.body;
        const Max_Skills=12;
 

        const UpdateKey=Object.keys(updates)
        const IsAllowed=UpdateKey.every(fields=>allowedFields.includes(fields))

        if (!IsAllowed) {
           throw new Error("You Cannot Update ");
        }
        else if(updates.Skills.length>Max_Skills){
            res.send(`You are not allowed to add more than ${Max_Skills } skills`)
        }
        const UpdateUser= await UserModel.findByIdAndUpdate(req.params.id,
            {$set:updates},
            {new:true,runValidators:true},
            )
    

        if (!UpdateUser) {
            return res.status(404).send("User not found");
        }

        res.status(200).json(UpdateUser); // Send the full updated document
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Failed to update");
    }
});

app.post("/register",async(req,res)=>{
    const {email,password}=req.body
    try{
        if (!validator.isEmail(email)){
        res.send("invalid emails info")
    } if(!validator.isStrongPassword(password)){
        res.send("invalid  password info")

    }else{
        const us= new UserModel(req.body)
         await us.save
        res.send("registerd succsefully")
    }
    }catch(err){
        console.log(err.message)
    }

    })



conncectdb()
console.log("data base is connected succesfully")

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})