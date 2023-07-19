import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Create from "./components/create/Create";
import FoodDetails from "./components/foodDetails/FoodDetails";
import FoodCatalog from "./components/foodCatalog/FoodCatalog";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function App() {
  /*const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);*/
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/food/:id" element={<FoodDetails />} />
          <Route exact path="/foods/:id" element={<FoodCatalog />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
