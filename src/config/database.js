const mongoose=require("mongoose")

const conncectdb=async()=>{
    try{

    const connect= await mongoose.connect("mongodb+srv://siddeshsk:Sidduyadav@backend.d5v7s5h.mongodb.net/DevTinder")
    
}catch(err){
    console.log(err)
}
}
// print("hlosrc\config\database.js")
module.exports={conncectdb}
