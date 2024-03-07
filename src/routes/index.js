import express from "express";
import userroutes from "./userroutes";
import blogroutes from "./blogroutes";

const router=express.Router()

router.use("/user",userroutes)
router.use("/blog",blogroutes)

export default router