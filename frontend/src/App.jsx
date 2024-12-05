import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./components/Home";
import Rooms from "./components/Rooms";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PageNotFound from "./components/PageNotFound";
import Facilities from "./components/Facilities";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <div style={{ marginTop: "72px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/About" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
