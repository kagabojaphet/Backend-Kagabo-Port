import errormessage from "../utils/errormessage";
import USER from "../model/user";

class DataChecker{
    static async userRegistrationEmpty(req,res,next){
        const {firstName,lastName,phoneNumber,email,password}=req.body
        if(firstName==""){
            return errormessage(res,401,`write firstName correctly`)
        }
        else if(lastName==""){
            return errormessage(res,401,`write lastName correctly`)
        }
        else if(phoneNumber==""){
            return errormessage(res,401,`write phoneNumber correctly`)
        }
        else if(email==""){
            return errormessage(res,401,`write email correctly`)
        }
        else if(password==""){
            return errormessage(res,401,`write password correctly`)
        }
        else{
            return next()
        }
    }

    static async emailExisting(req,res,next){
        const{email}=req.body
        const user=await USER.findOne({email})
        if(user){
            return errormessage(res,401,`User Already Exist`)
        }
        else{
            return next()
        }
    }
}
export default DataChecker