import nodemailer from "nodemailer";

const sendEmail = async ({ email, emailType, userID }) => {
  try {

    //TODO: Configure mailer for usage

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOptions ={
      from: 'civic.buddy.gov.in',
      to: email,
      subject: emailType === "VERIFY"? "Verify Your Email" : "Reset Your Password",
      html: "<b>Hello world?</b>", 
    };

    const mailResponse =  await transporter.sendMail(mailOptions);

    return mailResponse;


  } catch (error) {
    console.log("Could not send email ", error);
  }
};
