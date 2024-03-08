import express from "express";
import UserController from "../controller/userController";
import DataChecker from "../middlewares/dataChecker";
import Validator from "../middlewares/validator";

const router=express.Router()

router.post("/",DataChecker.userRegistrationEmpty,DataChecker.emailExisting,Validator.UserAccountRule(),Validator.InputValidator,UserController.createUser);
router.get("/",UserController.getAllUser);
router.delete("/",UserController.deleteAllUser);
router.get("/:id",UserController.getOneUser);
router.delete("/:id",UserController.deleteOneUser);
router.patch("/:id",UserController.update);
router.post("/:login",UserController.login);

export default router