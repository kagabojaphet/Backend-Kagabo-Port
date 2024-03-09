import mongoose from "mongoose";

const CommentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    postDate:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER"
    }
})
CommentSchema.pre(/^find/,function(next){
    this.populate({
        path:"user",
        select:""
    })
    next()
})
const COMMENT=mongoose.model("COMMENT",CommentSchema)
export default COMMENT