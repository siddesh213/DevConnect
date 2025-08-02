const mongoose=require("mongoose");

// Create a UserSchema
const allowedGenders = ["male", "female", "binary"];

const UserSchema=mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
       
    },
    EmailId:{

        type:String,
        required:true,
        unique:true,
        lowercase:true,
          trim: true
        

        
      
    },
    PassWord:{
        type:String,
        required:true

    },
    Gender:{
        type:String,
      
        validate:{
            validator: function(value) {
                    return allowedGenders.includes(value)
                },
                message:"Give  valid gender"
        },
    },
        
    
    Age:{
        type:Number,
        min:18
    },
    PhotoUrl:{
        type:String
    },
    About:{
        type:String,
        default:"This Is The Info Of My Profile"

    },
    Skills:{
        type:[String]
    }
})

// Create User model

const UserModel=mongoose.model("User",UserSchema)
module.exports={UserModel}
// console.log)