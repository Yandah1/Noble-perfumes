const mongoose = require('mongoose');

const guestCheckoutSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  shippingAddress: {
    type: String,
    required: true
  },
  contactDetails: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

guestCheckoutSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

guestCheckoutSchema.set('toJSON', {
  virtuals: true,
});

const GuestCheckout = mongoose.model('GuestCheckout', guestCheckoutSchema);

module.exports = GuestCheckout;