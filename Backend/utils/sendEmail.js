import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendEmail = async (to, subject, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Cozy Stay" <${process.env.EMAIL_USER}>`,
    to,
    subject,

    // 🔥 switched from text → html
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        
        <p>Hey there 👋</p>

        <p>
          Welcome to <strong>Cozy Stay</strong>!
        </p>

        <p>
          Use the code below to complete your sign-up:
        </p>

        <h2 style="letter-spacing: 3px; color: #000;">
          🔑 ${otp}
        </h2>

        <p>
          It’s valid for the next 10 minutes.
        </p>

        <p>
          Didn’t request this? No worries — just ignore this email.
        </p>

        <p style="margin-top: 20px;">
          Happy hosting 🏡<br/>
          <strong>— Team Cozy Stay</strong>
        </p>

      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent ✅", info.response);
  return info;
};

export default sendEmail;