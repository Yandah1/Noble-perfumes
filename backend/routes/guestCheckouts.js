const GuestCheckout = require('./models/guestCheckout');

// Example usage to create a guest checkout document
const guestCheckout = new GuestCheckout({
  orderId: '123456',
  shippingAddress: '123 Main Street, City, State',
  contactDetails: 'john@example.com',
  paymentMethod: 'Credit Card'
});

guestCheckout.save()
  .then(savedGuestCheckout => {
    console.log('Guest checkout saved:', savedGuestCheckout);
  })
  .catch(error => {
    console.error('Error saving guest checkout:', error);
  });