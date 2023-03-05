import nc from "next-connect";
import nodemailer from "nodemailer";
const handler = nc();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.gmail,
    pass: process.env.gmailPass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

handler.post(async (req, res) => {
  try {
    //send mail to user
    const details = {
      from: `Verify your email ${process.env.gmail}`,
      to: req.query.email,
      subject: ` ${process.env.gmail} -Verify your email`,
      html: `<h2>Verification code for reset your password</h2>
        <h4>Verification code: ${req.query.code}</h4>`,
    };
    //send mail
    transporter.sendMail(details, (error) => {
      if (error) {
        console.log(error);
      } else {
        res.send(
          `Verification code has been sent to ${req.query.email}.Please check your email address`
        );
      }
    });
  } catch (error) {
    console.log(error.message);
  }
});

export default handler;
