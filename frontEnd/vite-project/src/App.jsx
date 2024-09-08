import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./Components/Header";
import PrivateRoute from "./Components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header></Header>
       
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
          <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/search" element={<Search/>}></Route>
          <Route path="/listing/:listingId" element={<Listing/>}></Route>
          <Route element={<PrivateRoute></PrivateRoute>}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/create-listing" element={<CreateListing/>}></Route>
          <Route path='/update-listing/:listingId' element={<UpdateListing/>}></Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
