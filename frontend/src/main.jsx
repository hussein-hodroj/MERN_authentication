import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import store from './store.js'
import { Provider } from 'react-redux'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import HomeScreen from './screens/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  //wrap everything so now our store is there and it is imlemented with our app so we can use devtools on console
  // so now next we will create a slice and here we gonna have two slices and the slice is just where you can keep
  // pieces of state as well as your reducers that take in actions, one slice will called off slice it will be 
  // dealing with local stuff so it is going to take the user data that we get back from API and put it in local storage
  // and also put it in our auth state so it will have the ID the email and the Name but it is not the token okkay!! 
  //  the token is stored in HTTP only cookie
  //  other slice we gonna have the user API slice and that's where we actually make the request to the backend to login
  // or to authenticate where we register or we get profile or update our profile, so that stuff is going to be in 
  // the user API slice.
  <Provider store={store}>
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index={true} path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          {/* private routes */}
          <Route path='' element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfileScreen />} />
          </Route>

        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
  </Provider>
)
