import errormessage from "../utils/errormessage";
import Jwt,{ JsonWebTokenError } from "jsonwebtoken";

const VerifyAccess=(passRole)=>{
    return(req,res,next)=>{
        const token=req.headers["kagabo-port"]
        if(!token){
            return errormessage(res,401,`No Token Provided`)
        }
        else{
            try {
                const verifyToken=Jwt.verify(token,process.env.SECRET_KEY,{expiresIn:"1d"})
                req.user=verifyToken.user
                if(passRole!==verifyToken.user.role){
                    return errormessage(res,401,`You don't Have an Access`)
                }
                else{
                    return next()
                }
            } catch (error) {
                if(error=JsonWebTokenError){
                    return errormessage(res,401,`Invalid Token`)
                }
                
            }
        }
    }
}
export default VerifyAccess