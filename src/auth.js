
// HOW MIDDLEWARE HELPS TO AUTHORIZTION

/* HOW IT EXECUTE
Request: GET /alldata
   ↓
Step 2: Global middleware → ✅ logs "Global middleware"
   ↓
Step 3: Auth middleware → ✅ checks token → logs "Admin is authorized"
   ↓
Step 4: Route handler → ✅ logs "yes data is printed"
   ↓
Response: "✅ All data fetched"
*/




// step-1
const express=require("express")
const app=express();
// step-2
app.use ((req,res,next)=>{
    console.log("middlware is working fine for all request")
    next()
})
// step4
const auth =(req,res,next)=>{
    const token="sidduyadav";
    if (token=="sidduyaav"){
        console.log("Admin is authorized so send the all data")
        next();
    }else{
        res.status(401).send("not found ")
    }
}

// step-3 auth fucnction called when cline send http://localhost:3001/alldata request
app.get("/alldata",auth ,(req,res)=>{
    console.log("yes data is printed")
    res.send("finlaly cleared")
})

// step-3 auth fucnction called when cline send http://localhost:3001/usemodify request

app.get("/usemodify",auth ,(req,res)=>{
    console.log("yes data is modified")
    res.send("finlaly modified")
})
// step-1
app.listen(3001,()=>{
    console.log("server is running on port 3001")
})
