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

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact="true" path="/" element={<Home />} />
        <Route exact="true" path="/product/:id" element={<ProductDetails />} />
        <Route exact="true" path="/products" element={<Products />} />
        {/* <Route path="/products/:keyword" element={<Products />} />
        <Route exact="true" path="/search" element={<Search />} /> */}
        <Route exact="true" path="/login" element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
