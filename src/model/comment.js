import mongoose from "mongoose";

const CommentSchema=new mongoose.Schema({
    users:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER"
    },
    comment:{
        type:String,
        required:true
    },
    postDate:{
        type:Date,
        default:Date.now()
    }
})
CommentSchema.pre(/^find/,function(next){
    this.populate({
        path:"users",
        select:"firstName,lastName,email,phoneNumber"
    })
     next()
})
const COMMENT=mongoose.model("COMMENT",CommentSchema)
export default COMMENT