const errormessage=(res,status,message)=>{
    res.status(status).json({
        message:message
    })
}
export default errormessage