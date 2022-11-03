const dotenv = require("dotenv").config();
import nodemailer from "nodemailer";

const sendEmailConfirmBooking = async (dataSend) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_USER_NAME, // generated ethereal user
      pass: process.env.GMAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Health Care" <bt.hieuBVT145@gmail.com>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Xác minh đặt lịch khám bệnh ✔", // Subject line
    html: buildContentEmail(dataSend),
  });
};

const buildContentEmail = (dataSend) => {
  let content = "";
  if (dataSend.language === "vi") {
    content = `<h3>Xin chào ${dataSend.fullName}</h3>
    <p>Bạn nhận được Email này bởi vì chúng tôi nhận thấy bạn đã tiến hành đặt lịch khám bệnh trên trang web
    Heath Care.</p>
    <p>Thông tin lịch đã đặt:</p>
    <ul>
        <li><b>Thời gian: ${dataSend.timeString}.</b></li>
        <li><b>Bác sĩ: ${dataSend.doctorName}.</b></li>
    </ul>
    <p>Nếu các thông tin trên là đúng, vui lòng nhấn vào đường link bên dưới để xác nhận và hoàn tất đăt lịch khám bệnh.</p>
    <a href= ${dataSend.link} target="_blank">Click here</a>
    <p>Xin cảm ơn quý khách vì đã lựa chọn sử dụng dịch vụ của Heath Care ♥♥</p>
`;
  }
  if (dataSend.language === "en") {
    content = `<h3>Dear ${dataSend.fullName}!</h3>
    <p>You received this Email because we noticed that you have already booked a medical appointment on the website
    Heath Care.</p>
    <p>Scheduled information:</p>
    <ul>
        <li><b>Time: ${dataSend.timeString}.</b></li>
        <li><b>Doctor: ${dataSend.doctorName}.</b></li>
    </ul>
    <p>If the above information is correct, please click on the link below to confirm and complete the appointment.</p>
    <a href= ${dataSend.link} target="_blank">Click here</a>
    <p>Thank you for choosing to use Heath Care's services ♥♥</p>
`;
  }
  return content;
};

module.exports = {
  sendEmailConfirmBooking,
};
