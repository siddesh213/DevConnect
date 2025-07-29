const auth =(req,res,next)=>{
    const token="sidduyadav";
    if (token=="sidduyaav"){
        console.log("Admin is authorized so send the all data")
        next();
    }else{
        res.status(401).send("not found ")
    }
}
const userAuth=(req,res,next)=>{
    const token="siddu";
    if(token=="siddu1"){
        next()
    }else{
        res.status(401).send(" user is unAuthorized")
    }
}

module.exports={
    auth,userAuth}