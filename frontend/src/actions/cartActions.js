import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'
import { CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants'
import { CART_SAVE_PAYMENT_METHOD } from '../constants/cartConstants'

// getState: get state tree --> save entire cart to local storage
export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    // store.js --> state
    // can gain the products info in cart (including the history) from local storage --> quciker
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)); // can only save string to local storage
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data.paymentMethod
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data.paymentMethod));
}