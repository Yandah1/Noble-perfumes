function generateSignature(data, passPhrase) {
  // Create parameter string
  let pfOutput = '';

  for (const key in data) {
      if (data.hasOwnProperty(key)) {
          const value = data[key];

          if (typeof value === 'string' && value !== '') {
              pfOutput += `${key}=${encodeURIComponent(value.trim()).replace(/%20/g, '+')}&`;
          } else if (typeof value === 'number') {
              pfOutput += `${key}=${value}&`;
          }
      }
  }
  
  if (passPhrase !== null) {
      pfOutput += `passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, '+')}`;
  }

  return crypto.createHash('md5').update(pfOutput).digest('hex');
};

// Function to generate PayFast payment URL
function generatePayFastUrl(data) {
  const passPhrase = process.env.PASS_PHRASE || "nobleperfumes";
  // Extract required values from request body
  const {
    merchant_id,
    merchant_key,
    return_url,
    cancel_url,
    notify_url,
    name_first,
    email_address,
    item_name,
    m_payment_id,
    amount,
    signature
  } = data;
  data.signature = generateSignature(data, passPhrase);

  // Construct the PayFast payment URL
  const payFastUrl = `https://sandbox.payfast.co.za/eng/process?merchant_id=${merchant_id}&merchant_key=${merchant_key}&return_url=${return_url}&cancel_url=${cancel_url}&notify_url=${notify_url}&m_payment_id=${encodeURIComponent(m_payment_id)}&amount=${amount}&item_name=${encodeURIComponent(item_name)}&name_first=${encodeURIComponent(name_first)}&email_address=${encodeURIComponent(email_address)}&signature=${signature}`;

  return payFastUrl;
  }

const generateOrderNumber = () => {
    const timestamp = format(new Date(), 'yyyyMMddHHmmss');
    const orderNumber = timestamp;
    return orderNumber;
};


  
  module.exports = {
    generatePayFastUrl,
    generateOrderNumber
  };