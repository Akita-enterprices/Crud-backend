const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")


const app =  express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8000

//schema
const schemaData = mongoose.Schema({
    name:String,
    email:String,
    mobile:Number,

},{
    timestamp:true
})

const userModel = mongoose.model("user",schemaData)

//read data
app.get("/",async(req,res)=>{
    const data = await userModel.find({})
    res.json({success:true, data:data})
})

//create data // save data in mongodb
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({success: true, message:"Data save successfully",data:data})
})


//update data
app.put("/update",async(req,res)=>{
    console.log(req.body);
    const {_id:_id, ...rest}= req.body
    console.log(rest)
    const data = await userModel.updateOne({_id:_id},rest)
    res.send({success:true,message:"Data updated successfully",data:data})
})

//delete data
app.delete("/delete/:id",async(req,res)=>{
    const id= req.params.id
    console.log(id)
    const data =  await userModel.deleteOne({_id:id})
    res.send({success:true,message:"Data deleted successfully",data:data})
})

mongoose.connect("mongodb+srv://zahraazaam:zahraazaam@cluster2.qsbdpoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2"
)
.then(()=>{
    console.log("Connected to DB")
    app.listen(PORT,()=>console.log("Server is running"))
})
.catch((err)=>console.log("error"))

