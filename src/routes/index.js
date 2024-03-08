import express from "express";
import userroutes from "./userroutes";
import blogroutes from "./blogroutes";
import commentroute from "./commentroute"

const router=express.Router()

router.use("/user",userroutes)
router.use("/blog",blogroutes)
router.use("/comment",commentroute)

export default router