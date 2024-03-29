import express from "express";
import BlogController from "../controller/blogController";
import uploaded from "../middlewares/uploadImage";
import VerifyAccess from "../middlewares/verifyAccess";

const router=express.Router()

router.post("/",VerifyAccess("user"),uploaded,BlogController.postBlog);
router.get("/",BlogController.getAllBlog)
router.delete("/",BlogController.deleteAllBlog)
router.get("/:id",BlogController.getOneBlog)
router.delete("/:id",BlogController.deleteOneBlog)
router.patch("/:id",BlogController.update)
router.put("/Like/:id",VerifyAccess("user"),BlogController.like)
router.put("/Dislike/:id",VerifyAccess("user"),BlogController.dislike)

export default router