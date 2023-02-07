import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes'
import './App.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import { getAuth } from 'firebase/auth'
import app from './firebase/firebase.init'

const auth = getAuth(app)

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
