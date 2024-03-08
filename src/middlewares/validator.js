import errormessage from "../utils/errormessage";
import { check,validationResult } from "express-validator";

class Validator{
    static InputValidator(req,res,next){
        const error=validationResult(req)
        if(!error==error.isEmpty()){
            error.errors.map((err)=>{
                return errormessage(res,401,err.msg)
            })
        }
        else{
            return next()
        }
    }
    static UserAccountRule(){
        return[
                check("firstName","FirstName is String").trim().isAlpha(),
                check("lastName","LastName is String").trim().isAlpha(),
                check("phoneNumber","PhoneNumber is Number").trim().isNumeric(),
                check("email","Email must be contains @gmail.com").trim().isEmail(),
                check("password","make strong password").isStrongPassword(),
        ]
    }
}
export default Validator