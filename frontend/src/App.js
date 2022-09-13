import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './component/Layout/Header/Header.js';
import Footer from './component/Layout/Footer/Footer.js';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js';
import LoginSignUp from './component/User/LoginSignUp';
import Search from './component/Product/Search.js';
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
import OrderSucess from './component/Cart/OrderSucess.js';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import MyOrders from './component/Order/MyOrders.js';
import OrderDetails from './component/Order/OrderDetails.js';
import AdminDashboard from './component/Admin/AdminDashboard.js';
import ProductList from './component/Admin/ProductList.js';
import NewProduct from './component/Admin/NewProduct.js';
import UpdateProduct from './component/Admin/UpdateProduct.js';
import OrderList from './component/Admin/OrderList.js';
import ProcessOrder from './component/Admin/ProcessOrder.js';
import UsersList from './component/Admin/UsersList.js';
import UpdateUser from './component/Admin/UpdateUser.js';
import ProductReviews from './component/Admin/ProductReviews.js';
import Contact from "./component/Layout/Contact/Contact.js";
import PageNotFound from "./component/Layout/Contact/PageNotFound.js";
import About from "./component/Layout/About/About.js";

function App() {
  // const { isAthenticated, user } = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = useState(process.env.REACT_APP_STRIPE_API_KEY)

  const getStripeApiKey = async () => {
    const { data } = await axios.get(`/api/v1/stripeapikey`);
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
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact="true" path="/search" element={<Search />} />
        <Route exact="true" path="/password/forgot" element={<ForgotPassword />} />
        <Route exact="true" path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact="true" path="/login" element={<LoginSignUp />} />
        <Route exact="true" path="/cart" element={<Cart />} />
        <Route exact="true" path="/contact" element={<Contact />} />
        <Route exact="true" path="/about" element={<About />} />
        <Route exact="true" path="/*" element={<PageNotFound />} />

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
        <Route exact="true" path="/success" element=
          {<ProtectedRoute>
            <OrderSucess />
          </ProtectedRoute>}
        />
        <Route exact="true" path="/orders" element=
          {<ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>}
        />
        <Route exact="true" path="/orderdetail/:id" element=
          {<ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>}
        />
        <Route exact="true" path="/admin/dashboard" element=
          {<ProtectedRoute isAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>}
        />
        <Route exact="true" path="/admin/products" element=
          {<ProtectedRoute isAdmin={true}>
            <ProductList />
          </ProtectedRoute>}
        />
        <Route exact="true" path="/admin/product" element=
          {<ProtectedRoute isAdmin={true}>
            <NewProduct />
          </ProtectedRoute>}
        />
        <Route exact="true" path="/admin/product/:id" element=
          {<ProtectedRoute isAdmin={true}>
            <UpdateProduct />
          </ProtectedRoute>}
        />
        <Route exact="true" path="/admin/orders" element=
          {<ProtectedRoute isAdmin={true}>
            <OrderList />
          </ProtectedRoute>}
        />
        <Route exact="true" path="/admin/order/:id" element=
          {<ProtectedRoute isAdmin={true}>
            <ProcessOrder />
          </ProtectedRoute>}
        />
        <Route exact="true" path="/admin/users" element=
          {<ProtectedRoute isAdmin={true}>
            <UsersList />
          </ProtectedRoute>}
        />
        <Route exact="true" path="/admin/user/:id" element=
          {<ProtectedRoute isAdmin={true}>
            <UpdateUser />
          </ProtectedRoute>}
        />
        <Route exact="true" path="/admin/reviews" element=
          {<ProtectedRoute isAdmin={true}>
            <ProductReviews />
          </ProtectedRoute>}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
