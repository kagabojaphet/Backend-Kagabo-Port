import mongoose from "mongoose";

const blogSchema=new mongoose.Schema({
    blogTitle:{
        type:String,
        required:true
    },
    blogSummary:{
        type:String,
        required:true
    },
    blogDiscription:{
        type:String,
        required:true
    },
    blogImage:{
        type:String,
        required:true
    },
    postDate:{
        type:Date,
        default:Date.now()
    }
})
const BLOG=mongoose.model("BLOG",blogSchema)
export default BLOG