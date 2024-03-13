const nodemailer = require('nodemailer');

// Create a transporter using your email service provider's SMTP settings
const transporter = nodemailer.createTransport({
  service: 'your-email-service-provider',
  auth: {
    user: 'your-email@example.com',
    pass: 'your-email-password'
  }
});

// Function to send the confirmation email
async function sendConfirmationEmail(email, orderTrackingNumber) {
    try {
      const mailOptions = {
        from: 'your-email@example.com',
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
  
  module.exports = {
    sendConfirmationEmail
  };