import express from "express";
import getSchema from "./Models/ContactReq.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
let app = express();
const PORT = process.env.PORT;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    next();
});
app.use(express.json());
app.post("/", async (req, res) => {

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const Model=await getSchema();
        let data = req.body;
        let { Name, Email, Phone, Message } = data;
        const newMessage = new Model({
            Name: Name,
            Email: Email,
            Phone: Phone,
            Message: Message,
            Time:Date.now()
        })
        await newMessage.save();
        res.status(200).send({status:200,Message:"Message Sent Successfully!"});
    }
    catch(e){
        res.status(400).send({status:400,Message:"Some Error Occured! Please Try Later."});
    }
    finally{
        mongoose.disconnect();
    }
})
app.get("/", (req, res) => {
    res.send("Invalid URL");
})
app.listen(PORT, () => {
    console.log("Server Listening at "+ PORT);
})

