import nodemailer from "nodemailer";

const welcomeEmail=async(userinfo)=>{
    let transport=nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        },
    });
    let mailoptions={
        from:process.env.EMAIL,
        to:userinfo.email,
        subject:`Login Done`,
        html:`<p> Dear, <b>${userinfo.firstName}</b></p><br><br>
        <p> Your Login Successfuly Done!!!!! <br><br>${userinfo.firstName} Thank your`
    };
    transport.sendMail(mailoptions,function(err,info){
        if(err){
            console.log(err)
        }
        else{
            console.log(info)
        }
    });
}
export default welcomeEmail