const express=require("express")
const app=express()
const {UserModel}=require("./models/user")
const {conncectdb}=require("./config/database")
const { trusted } = require("mongoose")
app.use("/",express.json())

// Save User Data Into Your DataBase
app.post("/signup",async(req,res)=>{




    const UserObj= new UserModel(req.body)
    try{
    await UserObj.save()
    res.send("Signup Succesfully")
    }catch(err){
        console.log(err.message)
        res.status(400).send("User Failed to signup",err.message)
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


// Example Express.js route for updating a user's email
app.patch("/update/:id", async (req, res) => {
    const allowedFields = ["FirstName", "LastName", "PassWord", "Age", "PhotoUrl", "Skills"];
    const updates = req.body;

    const updateKeys = Object.keys(updates); // keys of fields client wants to update
    const isValidUpdate = updateKeys.every(field => allowedFields.includes(field));

    if (!isValidUpdate) {
        return res.status(400).send("You are not following the schema rules!");
    }

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,                   // ID is expected in the body
            { $set: updates },            // Only update fields passed by client
            { new: true, runValidators: true } // new=true returns updated doc, runValidators checks schema
        );

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }

        res.status(200).json(updatedUser); // Send the full updated document
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

conncectdb()
console.log("data base is connected succesfully")

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})