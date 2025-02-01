const emailrepo=require("../repos/email.repo");
const sendemail=async(toEmail,subject, text)=>{
   return await emailrepo.sendEmail(toEmail,subject, text)
}
module.exports={
    sendemail
}