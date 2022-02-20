import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './component/Layout/Header/Header.js';
import Footer from './component/Layout/Footer/Footer.js';
import Home from './component/Home/Home.js';
// import Loader from './component/Layout/Loader/Loader';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact="true" path="/" element={<Home />} />
        {/* <Route exact="true" path="/sad" element={<Loader />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
