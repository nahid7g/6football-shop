import { combineReducers } from 'redux'
import { cartReducer } from './cartReducers'
import {
  orderReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer,
} from './orderReducer'
import {
  createProductReviewReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productReducer,
  productUpdateReducer,
} from './productReducers'
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userProfileUpdateReducer,
  userReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './userReducers'

export const rootReducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  createProductReview: createProductReviewReducer,
  cart: cartReducer,
  userLogin: userReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  usersList: userListReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderMyList: orderListMyReducer,
  orderList: orderListReducer,
})
