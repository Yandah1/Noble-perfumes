const nodemailer = require('nodemailer');
const dotenv = require("dotenv");

// Create a transporter using your email service provider's SMTP settings
const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  secureConnection: true,
  service: 'Godaddy',
  port: 587,
  auth: {
    user: 'process.env.EMAIL_USER',
    pass: 'process.env.EMAIL_PASS'
  }
});

// Function to send the confirmation email
async function sendConfirmationEmail(email, orderTrackingNumber) {
    try {
      const mailOptions = {
        from: 'process.env.EMAIL_USER',
        to: email,
        subject: 'Payment Confirmation',
        text: `Thank you for your payment! Your payment has been successfully processed. Your order tracking number is: ${orderTrackingNumber}`
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);
      console.log('Confirmation email sent to:', email);
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      throw error;
    }
  }

// Function to send the notification to the customer
async function sendNotificationToCustomer(email, message) {
  try {
    const mailOptions = {
      from: 'process.env.EMAIL_USER',
      to: email,
      subject: 'Payment Notification',
      text: message
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Notification email sent to:', email);
  } catch (error) {
    console.error('Error sending notification email:', error);
    throw error;
  }
}
module.exports = {
  sendConfirmationEmail
};
