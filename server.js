const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3001; // You can choose any available port

// Configure the nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail', 'Yahoo', etc.
  auth: {
    user: 'dada80119@gmail.com',
    pass: 'chkh lpoh jsxp muhe',
  },
});

app.use(cors());
app.use(bodyParser.json());

// Endpoint to send OTP to the provided email
app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000);
  const mailOptions = {
    from: 'your-email@example.com',
    to: email,
    subject: 'OTP Verification - Welcome to TrackMyPaisa',
    text: `Your OTP is: ${otp}  to signup to our website. Never share OTP with anybody`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending OTP');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send(otp.toString());
    }
  });
});

// Add more endpoints for handling OTP verification, user registration, etc.

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
