import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './component/Layout/Header/Header.js';
import Footer from './component/Layout/Footer/Footer.js';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js';
import LoginSignUp from './component/User/LoginSignUp';
// import Search from './component/Product/Search.js';
import store from './store';
import { useEffect, useState } from 'react';
import { loadUser } from './actions/userAction';
// import UserOptions from './component/Layout/Header/UserOptions.js';
// import { useSelector } from 'react-redux';
import Profile from './component/User/Profile.js';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from './component/User/UpdatePassword.js';
import ForgotPassword from './component/User/ForgotPassword.js';
import ResetPassword from './component/User/ResetPassword.js';
import Cart from './component/Cart/Cart.js';
import Shipping from './component/Cart/Shipping.js';
import ConfirmOrder from './component/Cart/ConfirmOrder.js';
import Payment from './component/Cart/Payment.js';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function App() {
  // const { isAthenticated, user } = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = useState(process.env.REACT_APP_STRIPE_API_KEY)

  const getStripeApiKey = async () => {
    const { data } = await axios.get(`/api/v1/stripeapikey`);
    console.log({ key: process.env.REACT_APP_STRIPE_API_KEY });
    setStripeApiKey(data.stripeKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, [])

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact="true" path="/" element={<Home />} />
        <Route exact="true" path="/product/:id" element={<ProductDetails />} />
        <Route exact="true" path="/products" element={<Products />} />
        {/* <Route path="/products/:keyword" element={<Products />} />
        <Route exact="true" path="/search" element={<Search />} /> */}
        <Route exact="true" path="/password/forgot" element={<ForgotPassword />} />
        <Route exact="true" path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact="true" path="/login" element={<LoginSignUp />} />
        <Route exact="true" path="/cart" element={<Cart />} />

        <Route exact="true" path="/profile" element=
          {<ProtectedRoute>
            <Profile />
          </ProtectedRoute>}
        />
        <Route exact="true" path="/me/update" element=
          {<ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>}
        />
        <Route exact="true" path="/password/update" element=
          {<ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>}
        />
        <Route exact="true" path="/shipping" element=
          {<ProtectedRoute>
            <Shipping />
          </ProtectedRoute>}
        />
        <Route exact="true" path="/order/confirm" element=
          {<ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>}
        />
        < Route exact="true" path="/process/payment"
          element={
            <ProtectedRoute>
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            </ProtectedRoute>}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
