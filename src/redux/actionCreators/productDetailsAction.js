import axios from 'axios'
import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_ERROR,
  CREATE_PRODUCT_REVIEWS_ERROR,
  CREATE_PRODUCT_REVIEWS_REQUEST,
  CREATE_PRODUCT_REVIEWS_SUCCESS,
} from '../actionTypes/productListActions'
import { USER_LOGOUT } from '../actionTypes/userActions'

export const listProductDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createTheProductReview =
  (id, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_PRODUCT_REVIEWS_REQUEST })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      await axios.post(
        `http://localhost:5000/api/products/${id}/reviews`,
        review,
        config
      )
      dispatch({ type: CREATE_PRODUCT_REVIEWS_SUCCESS })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(USER_LOGOUT())
      }
      dispatch({
        type: CREATE_PRODUCT_REVIEWS_ERROR,
        payload: message,
      })
    }
  }
