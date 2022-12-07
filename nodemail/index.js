const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// create a new express app
const app = express();

// configure nodemailer with your email provider's settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "euadorno21@gmail.com",
    pass: `${process.env.GMAIL_PASSWORD}`,
  },
});

// send an email
const sendMail = {
  from: "euadorno21@gmail.com",
  to: "ricardo.castrorc1998@gmail.com",
  subject: "Hello",
  text: "Hello, world!",
};

transporter.sendMail(sendMail, function (err, data) {
  if (err) {
    console.log("Error Occurs!", err);
  } else {
    console.log("Email sent successfully");
  }
});
