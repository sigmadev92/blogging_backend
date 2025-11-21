import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    requestedBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    requestedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
    ,
    status:{
        type:String,
        enum:["pending","accepted"],
        default:"pending",
    }



},{timestamps:true})

const Request = mongoose.model("Request", requestSchema);

export default Request