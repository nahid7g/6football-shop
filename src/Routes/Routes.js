import { createBrowserRouter } from 'react-router-dom'
import Main from '../Layout/Main'
import Cart from '../Pages/Cart/Cart'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import Order from '../Pages/Order/Order'
import OrderList from '../Pages/OrderList/OrderList'
import Payment from '../Pages/Payment/Payment'
import PlaceOrder from '../Pages/PlaceOrder/PlaceOrder'
import Product from '../Pages/Product/Product'
import ProductEdit from '../Pages/ProductEdit/ProductEdit'
import ProductList from '../Pages/ProductList/ProductList'
import Profile from '../Pages/Profile/Profile'
import Register from '../Pages/Register/Register'
import Shipping from '../Pages/Shipping/Shipping'
import UserEdit from '../Pages/UserEdit/UserEdit'
import UserList from '../Pages/UserList/UserList'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'cart/:id?',
        element: <Cart />,
      },
      {
        path: 'product/:id',
        element: <Product />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'shipping',
        element: <Shipping />,
      },
      {
        path: 'payment',
        element: <Payment />,
      },
      {
        path: 'placeorder',
        element: <PlaceOrder />,
      },
      {
        path: 'order/:id',
        element: <Order />,
      },
      {
        path: 'admin/user-list',
        element: <UserList />,
      },
      {
        path: 'admin/user/:id/edit',
        element: <UserEdit />,
      },
      {
        path: 'admin/product-list',
        element: <ProductList />,
      },
      {
        path: 'admin/product/:id/edit',
        element: <ProductEdit />,
      },
      {
        path: 'admin/order-list',
        element: <OrderList />,
      },
    ],
  },
])

export default router
