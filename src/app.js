const express=require("express")
const app=express();


app.get("/user",(req,res,next)=>{
   console.log("my first console")
    next();
},(req,res,next)=>{
   console.log("my second console")
    next();
},(req,res,next)=>{
   

    console.log("my third console")
    next();
   
},(req,res,next)=>{
   

    console.log("my fourth console")
    next();
   
},(req,res,next)=>{
  res.send("5th responce")
   next();

     console.log("my fifth console")
     
    
},(req,res)=>{
    console.log("hi");
    // res.send("my 6th respnce")
    
    

})


app.listen(3000,()=>{
    console.log("server is listening on port 3000");
})