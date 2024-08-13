import mongoose from "mongoose";
const getSchema=async()=>{
    const schema=new mongoose.Schema({
    Name:String,
    Email:String,
    Phone:{type:String,required:false},
    Message:String,
    Time:{type:Date,default:Date.now()}
});
return mongoose.model("ContactMe",schema);
}
export default getSchema;