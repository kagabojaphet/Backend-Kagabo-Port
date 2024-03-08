import express from "express";
import CommentController from "../controller/commentController";
import VerifyAccess from "../middlewares/verifyAccess";

const router=express.Router()

router.post("/:id",VerifyAccess("user"),CommentController.postComment)
router.get("/",CommentController.getAllComment)
router.delete("/",CommentController.deleteAllComment)

export default router