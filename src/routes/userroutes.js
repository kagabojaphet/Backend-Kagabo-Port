import express from "express";
import UserController from "../controller/userController";

const router=express.Router()

router.post("/",UserController.createUser);
router.get("/",UserController.getAllUser);
router.delete("/",UserController.deleteAllUser);
router.get("/:id",UserController.getOneUser);
router.delete("/:id",UserController.deleteOneUser);
router.patch("/:id",UserController.update);
router.post("/:login",UserController.login);

export default router