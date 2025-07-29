const mongoose=require("mongoose");

// Create a UserSchema
const UserSchema=mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    EmailId:{
        type:String
        
      
    },
    PassWord:{
        type:String,
        required:true

    },
    Gender:{
        type:String,
        required:true
    },
    Age:{
        type:Number
    }
    
})
// Create User model

const UserModel=mongoose.model("User",UserSchema)
module.exports={UserModel}
// console.log)