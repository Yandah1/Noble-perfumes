
// Function to generate PayFast payment URL
function generatePayFastUrl(orderId, amount) {
    const merchantId = '0032903';
    const merchantKey = 'runrf7hq41f3s';
    const returnUrl = 'http://www.nobleperfumes.store/return';
  
    // Construct the PayFast payment URL
    const payFastUrl = `https://www.payfast.co.za/eng/process?merchant_id=${merchantId}&merchant_key=${merchantKey}&return_url=${returnUrl}&m_payment_id=${orderId}&amount=${amount}`;
  
    return payFastUrl;
  }
  
  module.exports = {
    generatePayFastUrl,
  };