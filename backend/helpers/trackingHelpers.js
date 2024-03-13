function generateTrackingNumber() {
    const prefix = 'TRK'; // Optional prefix for the tracking number
    const uniqueId = generateUniqueId(); // Generate a unique identifier
    const randomChars = generateRandomChars(4); // Generate random characters
  
    const trackingNumber = `${prefix}${uniqueId}${randomChars}`;
    return trackingNumber;
  }
  
  function generateUniqueId() {
    const { v4: uuidv4 } = require('uuid');
    const uniqueId = uuidv4().replace(/-/g, '');
    return uniqueId;
  }
  
  function generateRandomChars(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomChars = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomChars += characters.charAt(randomIndex);
    }
    return randomChars;
  }