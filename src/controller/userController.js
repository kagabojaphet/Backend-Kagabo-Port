import express from "express";
import USER from "../model/user";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import errormessage from "../utils/errormessage";
import successmessage from "../utils/successmessage";

class UserController{

    static async createUser(req,res){
        try {
            const {firstName,lastName,phoneNumber,email,role,password}=req.body
            if(req.body.password!==req.body.confirmPassword){
                return errormessage(res,401,`Password and ConfirmPassword must be match`)
            }
            const hashPassword=bcrypt.hashSync(req.body.password,10)
            const user=await USER.create({firstName,lastName,phoneNumber,email,role,password:hashPassword})
            return successmessage (res,201,`usersuccessfully created`,user)

        } catch (error) {
            return errormessage(res,500,`Error!! ${error}`)
        }
    }

    static async getAllUser(req,res){
        try {
            const user=await USER.find()
            if(!user){
                return errormessage(res,401,`User Not Found`);
            }
            else{
                return successmessage(res,200,`All ${user.length} User Successfuly Retrieved`,user)
            }
        } catch (error) {
            return errormessage(res,500,`Error!! ${error}`)
        }
    }

    static async deleteAllUser(req,res){
        try {
            const user=await USER.deleteMany()
            if(!user){
                return errormessage(res,401,`Users Not Deleted`)
            }
            else{
                return successmessage(res,200,`Users Successfully Deleted`)
            }
        } catch (error) {
            return errormessage(res,500,`Error!! ${error}`)
        }
    }

    static async getOneUser(req,res){
        const id=req.params.id
        try {
            if(id.length !==24 || id.length <24){
                return errormessage(res,401,`Invalid ID`)
            }
            const user=await USER.findById(id)
            if(!user){
                return errormessage(res,401,`User with ${id} Not Found`)
            }
            else{
                return successmessage(res,201,`User Successfuly Retrieved`,user)
            }
        } catch (error) {
            return errormessage(res,500,error)
        }
    }

    static async deleteOneUser(req,res){
        try {
            const id=req.params.id
            if(id.length!==24 || id.length<24){
                return errormessage(res,401,`Invalid ID`)
            }
            const user=await USER.findByIdAndDelete(id)
            if(!user){
                return errormessage(res,401,`User Not Deleted`)
            }
            else{
                return successmessage(res,200,`User Successfully Deleted`)
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
            const user=await USER.findByIdAndUpdate(id,req.body,{new:true})
                if(!user){
                    return errormessage(res,401,`User Not Updated`)
                }
                else{
                    return successmessage(res,200,`User Successfully Created`,user)
                }
        } catch (error) {
            return errormessage(res,500,`Error!! ${error}`)
        }
    }

    static async login(req,res){
        try {
            const{email,password}=req.body
            const user=await USER.findOne({email})
            if(!user){
                return errormessage(res,401,`Incorrect Email`)
            }
            else{
                const passwordCompare=bcrypt.compareSync(password,user.password)
                if(!passwordCompare){
                    return errormessage(res,401,`Incorrect Password`)
                }else{
                    const token=Jwt.sign({user:user},process.env.SECRET_KEY,{expiresIn:"1d"})
                    res.status(200).json({
                        token:token,
                        data:{
                            user:user
                        }
                    })
                }
            }
        } catch (error) {
            return errormessage(res,500,`Error!! ${error}`)
        }
    }
}
export default UserController