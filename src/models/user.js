const mongoose=require("mongoose");

// Create a UserSchema
const allowedGenders = ["male", "female", "binary"];

const UserSchema=mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
        minLength:5,
    
        maxLength:10
    },
  
    LastName:{
        type:String,
        minLength:2,
        minLength:4
       
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
        required:true,
        unique:true
        

    },
    Gender:{
        type:String,
        required:true,
        lowercase:true,
      
        validate:{
            validator: function(value) {
                    return allowedGenders.includes(value)
                },
                message:"Give  valid gender"
        },
    },
        
    
    Age:{
        type:Number,
        min:[18,"User must be at least 18 years old"],
        max:[90,"please enter a realistic age"],
       
        validate:{
            validator:Number.isInteger,
            message:"Age must be an integer"
        }

    },
    PhotoUrl:{
        type:String
    },
    About:{
        type:String,
        default:"This Is The Info Of My Profile"

    },
    Skills:{
        type:[String],
        default:[]
    },

},{
    timestamps:true
})

// Create User model

const UserModel=mongoose.model("User",UserSchema)
module.exports={UserModel}
// console.log)