import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./components/Home";
import Rooms from "./components/Rooms";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PageNotFound from "./components/PageNotFound";
import Offers from "./components/Offers";
import Header from "./components/Header";
import Book from "./components/Book";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <div className="mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<Book />} />
            <Route path="/About" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
