
const validator=require("validator")

const ValidateSignupData=(req)=>{
    const {FirstName,LastName,EmailId,PassWord}=req.body
    if (!FirstName || !LastName || !EmailId|| !PassWord){
        throw new Error("Please fill all required fields (FirstName,LastName,EmailId,PassWord,Gender)")
    }

 else if (!validator.isEmail(EmailId)){
    throw new Error("Your email id is not valid")
 } else if (!validator.isStrongPassword(PassWord)){
    throw new Error("Passord must be valid")
 }  


}
module.exports={
    ValidateSignupData}