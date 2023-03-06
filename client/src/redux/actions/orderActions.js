import axios from 'axios';
import {setError, shippingAddressAdd} from '../slices/order'

export const setShippingAddress = (data) => (dispatch) => {
  dispatch(shippingAddressAdd(data));
};

export const setShippingAddressError = (value) => (dispatch) => {
  dispatch(setError(value));
};

export const createOrder = (order) => async (getState) => {
  const {
    order: { shippingAddress },
  } = getState();

  const preparedOrder = { ...order, shippingAddress };
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('api/order', preparedOrder, config);
  } catch (error) {
    setError(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        ? error.message
        : 'An unexpected error has occurred. Please try again later.'
    );
  }
};