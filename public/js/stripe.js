/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51Qr546DAntzzJLqDvnRJc23nKvE5kGLvZbl96OnGcEuJ4act4rieCU8D4qOSUfnVEQe0dKL8ZOJNy0lu0JnFzshn00yFeXTbWE',
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from backend API
    const session = await axios(
      `http://localhost:8000/api/v1/bookings/checkout-session/${tourId}`,
    );
    // console.log(session);

    // create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
