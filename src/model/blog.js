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
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"COMMENT"
    }],
    like:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER"
    }],
    dislike:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER"
    }],
    postDate:{
        type:Date,
        default:Date.now()
    }
})
blogSchema.pre(/^find/,function(next){
    this.populate({
        path:"comment",
        select:"comment postDate"
    })
    return next()
})

const BLOG=mongoose.model("BLOG",blogSchema)
export default BLOG