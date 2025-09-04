const mongoose = require("mongoose");
const validator = require("validator");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
// Allowed genders
const allowedGenders = ["male", "female", "binary"];

const UserSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
    minlength: 2,   // more practical than 5
    maxlength: 30,
    trim: true
  },

  LastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,  // allow longer last names
    trim: true
  },

  EmailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: 254,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Enter a valid email"
    }
  },

  PassWord: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (value) => validator.isStrongPassword(value),
      message: "Password must be strong (min 8 chars, mix of uppercase, lowercase, number, symbol)"
    }
  },

  Gender: {
    type: String,
    lowercase: true,
    validate: {
      validator: (value) => allowedGenders.includes(value),
      message: "Gender must be male, female, or binary"
    }
  },

  Age: {
    type: Number,
    min: [18, "User must be at least 18 years old"],
    max: [90, "Please enter a realistic age"],
    validate: {
      validator: Number.isInteger,
      message: "Age must be an integer"
    }
  },

  PhotoUrl: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: "Enter a valid PhotoUrl"
    }
  },

  About: {
    type: String,
    trim: true,
    default: "This Is The Info Of My Profile"
  },

  Skills: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

// Create User model

UserSchema.methods.getJWT=async function () {
  
  const user=this
  const payload={User_Id:user._id}
  const SecreteKey="DevConnector@2004"
  const token=jwt.sign(payload,SecreteKey,{expiresIn:"1d"})
  
return token
}
UserSchema.methods.VerifyPassword= async function(PassWord){
  const MyPassword=this
  const isStrongPassword=await bcrypt.compare(PassWord,MyPassword.PassWord)
  return isStrongPassword

}
const UserModel = mongoose.model("User", UserSchema);


module.exports = { UserModel };
