const successmessage=(res,status,message,data)=>{
    res.status(status).json({
        message:message,
        data:data
    })
}
export default successmessage