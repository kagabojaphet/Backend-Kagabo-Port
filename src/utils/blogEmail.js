import nodemailer from "nodemailer"

const blogemail=async(userInfo,blogInfo)=>{
    let transport=nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        auth:{
            user:process.env.EMAIL,
            pass    :process.env.PASSWORD
        },
    });
    let mailOption={
        from:process.env.EMAIL,
        to:userInfo.email,
        subject:`New Blog Posted`,
        html:`<p>Dear</p><p><b>${userInfo.firstName}</b></p><p> You did know?New blog Postec<br><br>
        you received<b> ${blogInfo.title} new blog</b></p>`
    }
    transport.sendMail(mailOption,function(err,info){
        if(err){
            console.log(err)
        }
        else{
            console.log(info)
        }
    })
}
export default blogemail