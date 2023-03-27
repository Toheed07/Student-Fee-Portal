import Home from "./routes/home/home";
import NavBar from "./routes/navigation/navigation";
import SignIn from "./components/sign-in-form/sign-in-form";
import SignUp from "./components/sign-up-form/sign-up-form";

import React from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
     <Route path='/' element={<NavBar />} />
      <Route index element={<NavBar />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
}

export default App;
