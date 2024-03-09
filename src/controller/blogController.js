import BLOG from "../model/blog";
import USER from "../model/user";
import errormessage from "../utils/errormessage";
import successmessage from "../utils/successmessage";

class BlogController{
    static async postBlog(req,res){
        try {
            const{blogTitle,blogSummary,blogDiscription}=req.body
            const blogImage = req.file ? req.file.path : null;
            const blog=await BLOG.create({blogTitle,blogSummary,blogDiscription,blogImage})
            
            if(!blog){
                return errormessage(res,401,`Blog Not Created`)
            }
            else{
                return successmessage(res,201,`Blog Successfully created`,blog)
            }
        } catch (error) {
            return errormessage(res,500,`Error!! ${error}`)
        }

    }

    static async getAllBlog(req,res){
        try {
            const blog=await BLOG.find()
            if(!blog){
                return errormessage(res,401,`Blogs Not Found`)
            }
            else{
                return successmessage(res,200,`All ${blog.length} Blog Successfully Retrieved`,blog)
            }
        } catch (error) {
            return errormessage(res,500,`Eroor!! ${error}`)
        }
    }

    static async deleteAllBlog(req,res){
        try {
            const blog=await BLOG.deleteMany()
            if(!blog){
                return errormessage(res,401,`Blogs Not Deleted`)
            }
            else{
                return successmessage(res,200,`All Blogs Successfull Deleted`)
            }
        } catch (error) {
            return errormessage(res,500,`Error!! ${error}`)
        }
    }

    static async getOneBlog(req,res){
        try {
            const id=req.params.id
            if(id.length !==24 || id.length <24){
                return errormessage(res,401,`Invalid ID`)
            }
            const blog=await BLOG.findById(id)
            if(!blog){
                return errormessage(res,401,`Blog with ${id} Not found`)
            }
            return successmessage(res,201,`Blog Successfully Retrieved`,blog)
        } catch (error) {
            return errormessage(res,500,`Error!! ${error}`)
        }
    }

    static async deleteOneBlog(req,res){
        try {
            const id=req.params.id
        if(id.length !==24 || id.length <24){
            return errormessage(res,401,`Invalid ID`)
        }
        const blog=await BLOG.findOneAndDelete(id)
        if(!blog){
            return errormessage(res,401,`Blog with ${id} Not Deleted`)
        }
        else{
            return successmessage(res,200,`Blog Successfully Deleted`)
        }
        } catch (error) {
            return errormessage(res,500,`Error!! ${error}`)
        }
        
    }

    static async update(req,res){
        try {
            const id=req.params.id
            if(id.length!==24 || id.length<24){
                return errormessage(res,401,`Invalid ID`)
            }
            const blog=await BLOG.findByIdAndUpdate(id,req.body,{new:true})
            if(!blog){
                return errormessage(res,401,`Blog Not Updated`)
            }
            else{
                return successmessage(res,200,`Blog Successfully Updated`,blog)
            }
        } catch (error) {
            return errormessage(res,500,`Error!! ${error}`)
        }
    }

    static async like(req,res){
        const id=req.params.id
        try {
            if(id.length !==24 || id.length <24){
                return errormessage(res,401,`Invalid ID`)
            }
            const blog=await BLOG.findById(id)
                if(!blog){
                    return errormessage(res,401,`Blog Not Found`)
                }
                else{
                    const userId=req.user._id
                    if(blog.like.includes(userId)){
                        return errormessage(res,401,`Already You Like this Blog`)
                    }
                    else{
                        if(blog.dislike.includes(userId)){
                            blog.dislike.pull(userId)
                        }
                        blog.like.push(userId)
                        blog.save()
                        return successmessage(res,200,`Like From ${req.user.firstName}`)
                    }
                }
        } catch (error) {
            errormessage(res,500,`Error!! ${error}`)
        }
    }

    static async dislike(req,res){
        try {
         const id=req.params.id
         if(id.length !==24 || id.length<24){
             return errormessage(res,401,`Invalid ID`)
         }
         const blog=await BLOG.findById(id)
         if(!blog){
             return errormessage(res,401,`Blog Not Found`)
         }
         else{
             const userId=req.user._id
             if(blog.dislike.includes(userId)){
                 return errormessage(res,401,`Already You DisLike this Blog`)
             }
             else{
                 if(blog.like.includes(userId)){
                     blog.like.pull(userId)
                 }
                 blog.dislike.push(userId)
                 blog.save()
                 return successmessage(res,200,`DisLike From ${req.user.firstName}`)
             }
         }
        } catch (error) {
         return errormessage(res,500,`Error!! ${error}`)
        }
     }
}
export default BlogController