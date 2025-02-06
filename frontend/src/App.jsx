import React from "react";
import { Routes, Route } from "react-router";
import Home from "./components/Home";
import Rooms from "./components/Rooms";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PageNotFound from "./components/PageNotFound";
import Header from "./components/Header";
import Book from "./components/Book";
import { AuthProvider } from "./components/AuthProvider";
import ProtectedAuthRoute from "./components/ProtectedAuthRoute";
import BookingSuccess from "./components/BookingSuccess";
import Payment from "./components/Payment";
import ReviewConfirmation from "./components/ReviewConfirmation";

const App = () => {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<Book />} />
        <Route path="/About" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<ProtectedAuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/review/:id" element={<ReviewConfirmation />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/confirmation" element={<BookingSuccess />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
