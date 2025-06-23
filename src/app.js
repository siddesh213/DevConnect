const express=require("express")
const app=express()
app.get("/",(req,res)=>{
    res.send("first server is created")
})
app.get("/msg",(req,res)=>{
    res.send("msg is created")
})


app.listen(3000,()=>{
    console.log("server is listening on port 3000")
})