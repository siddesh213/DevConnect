const express=require("express")
const app=express()

const {conncectdb}=require("./config/database")

const cookie_parser=require("cookie-parser")

const {UserAuth}=require("./middlwares/auth.js")
console.log("UserAuth is:", UserAuth);

app.use(express.json())
app.use(cookie_parser())
const {authRouter}=require("./Routers/Auth")
const {ProfileRouter}=require("./Routers/profile")
const {RequestRouter}=require("./Routers/sendrequest.js")
app.use("/",authRouter)
app.use("/",ProfileRouter)
app.use("/",RequestRouter)



conncectdb()
console.log("data base is connected succesfully")

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})