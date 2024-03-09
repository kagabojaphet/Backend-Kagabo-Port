import COMMENT from "../model/comment";
import errormessage from "../utils/errormessage";
import successmessage from "../utils/successmessage";
import BLOG from "../model/blog";

class CommentController{
    static async postComment(req,res){
        const blogid=req.params.id
        req.body.user=req.user._id
        try {
            if(blogid.length!==24 || blogid.length<24){
                return errormessage(res,401,`Invalid ID`)
            }
            const comments=await COMMENT.create(req.body)
            const blog=await BLOG.findByIdAndUpdate({_id:blogid},{$push:{comment:comments}},{new:true})
            if(!blog){
                return errormessage(res,401,`Comment Not Posted`)
            }
            else{
                return successmessage(res,201,`Comment Successfully Posted`,blog)
            }
            
        } catch (error) {
            return errormessage(res,500,`Error!! ${error}`)
        }
    }

    static async getAllComment(req,res){
        try {
            const comment=await COMMENT.find()
            if(!comment){
                return errormessage(res,401,`Comment Not Found`)
            }
            else{
                return successmessage(res,200,`All ${comment.length} Comment Successfully Retrieved`,comment)
            }
        } catch (error) {
            return errormessage(res,500,`Error!! ${error}`)
        }
    }

    static async deleteAllComment(req,res){
        try {
            const comment=await COMMENT.deleteMany()
            if(!comment){
                return errormessage(res,401,`Comment Not Found`)
            }
            else{
                return successmessage(res,200,`All Comment Successfuly Deleted`)
            }
        } catch (error) {
            return errormessage(res,500,`Error!! ${error}`)
        }
    }

    static async getOneComment(req,res){
        try {
            const id=req.params.id
            if(id.length !==24 || id.length<24){
                return errormessage(res,401,`Invalid ID`)
            }
            const comment=await COMMENT.findById(id)
            if(!comment){
                return errormessage(res,401,`Comment Not Found`)
            }
            else{
                return successmessage(res,200,`Comment Successfully Retrieved`,comment)
            }
        } catch (error) {
            return errormessage(res,500,`Error!! ${error}`)
        }
    }

    static async deleteOneComment(req,res){
        try {
            const id=req.params.id
            if(id.length !==24 || id.length <24){
                return errormessage(res,401,`Invalid ID`)
            }
            const blog=await COMMENT.findOneAndDelete(id)
            if(!blog){
                return errormessage(res,401,`Comment with ${id} Not Deleted`)
            }
            else{
                return successmessage(res,200,`Comment Successfully Deleted`)
            }
            } catch (error) {
                return errormessage(res,500,`Error!! ${error}`)
            }
            
    }

    static async update(req,res){
        try {
            const id=req.params.id
            if(id.length !==24 || id.length <24){
                return errormessage(res,401,`Invalid ID`)
            }
            const comment=await COMMENT.findByIdAndUpdate(id,req.body,{new:true})
            if(!comment){
                return errormessage(res,401,`Comment Not Updated`)
            }
            else{
                return successmessage(res,200,`Comment Successfully Updated`,comment)
            }
        } catch (error) {
            return errormessage(res,500,`Error!! ${error}`)
        }
    }


}
export default CommentController