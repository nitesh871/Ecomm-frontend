// src/components/PaymentComponent.js
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_stripe_publishable_key');

const PaymentComponent = () => {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('');
  const [stripeKey, setStripeKey] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        name: description,
        description: description,
        amount: parseInt(amount) * 100, // Amount in cents
        currency: 'usd',
        quantity: 1,
      }],
      mode: 'payment',
      successUrl: 'https://yourdomain.com/success',
      cancelUrl: 'https://yourdomain.com/cancel',
    });

    if (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handlePayment}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-2">Name:</label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="img" className="block text-sm font-semibold mb-2">Image URL:</label>
          <input
            type="text"
            id="img"
            className="w-full p-2 border rounded"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="billingAddress" className="block text-sm font-semibold mb-2">Billing Address:</label>
          <textarea
            id="billingAddress"
            className="w-full p-2 border rounded"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="shippingAddress" className="block text-sm font-semibold mb-2">Shipping Address:</label>
          <textarea
            id="shippingAddress"
            className="w-full p-2 border rounded"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold mb-2">Description:</label>
          <input
            type="text"
            id="description"
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-semibold mb-2">Amount:</label>
          <input
            type="number"
            id="amount"
            className="w-full p-2 border rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="token" className="block text-sm font-semibold mb-2">Token:</label>
          <input
            type="text"
            id="token"
            className="w-full p-2 border rounded"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="stripeKey" className="block text-sm font-semibold mb-2">Stripe Key:</label>
          <input
            type="text"
            id="stripeKey"
            className="w-full p-2 border rounded"
            value={stripeKey}
            onChange={(e) => setStripeKey(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentComponent;
