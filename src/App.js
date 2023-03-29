import Home from "./routes/home/home";
import NavBar from "./routes/navigation/navigation";
import SignInForm from "./components/sign-in-form/sign-in-form";
import SignUpForm from "./components/sign-up-form/sign-up-form";
import Profile from "./routes/profile/profile.jsx";
import React from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </>
  );
}

export default App;
// <Routes>
//   <Route path="/" element={<Home />} />
//   <Route index element={<NavBar />} />
// <Route path="/sign-in" element={<SignInForm />} />
// <Route path="/sign-up" element={<SignUpForm />} />
// </Routes>
