import express from "express";
import BlogController from "../controller/blogController";

const router=express.Router()

router.post("/",BlogController.postBlog)
router.get("/",BlogController.getAllBlog)
router.delete("/",BlogController.deleteAllBlog)
router.get("/:id",BlogController.getOneBlog)
router.delete("/:id",BlogController.deleteOneBlog)
router.patch("/:id",BlogController.update)

export default router