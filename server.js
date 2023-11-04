const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3001;

app.use(bodyParser.json());

// Generate a random OTP
function generateOTP() {
  return crypto.randomBytes(4).toString('hex');
}

// Store OTPs and email associations (use a database in a production environment)
const otps = new Map();

// Send email with OTP
app.post('/sendOTP', (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();

  // Send the OTP via email (replace with your email sending logic)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'dada80119@gmail.com',
      pass: 'icaj dyqv joyx nqur',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Failed to send OTP');
    } else {
      // Store the OTP with the associated email (in-memory; use a database in production)
      otps.set(email, { otp, timestamp: Date.now() });
      res.status(200).send('OTP sent successfully');
    }
  });
});

// Verify OTP
app.post('/verifyOTP', (req, res) => {
  const { email, userOTP } = req.body;
  const storedOTP = otps.get(email);

  if (!storedOTP || Date.now() - storedOTP.timestamp > 300000) {
    // OTP has expired (5 minutes)
    res.status(401).send('OTP expired');
  } else if (storedOTP.otp === userOTP) {
    // OTP is correct
    otps.delete(email); // Remove used OTP from storage
    res.status(200).send('OTP verified successfully');
  } else {
    // Incorrect OTP
    res.status(401).send('Invalid OTP');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
