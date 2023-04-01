import Home from "./routes/home/home";
import NavBar from "./routes/navigation/navigation";
import SignInForm from "./components/sign-in-form/sign-in-form";
import SignUpForm from "./components/sign-up-form/sign-up-form";
import Profile from "./routes/profile/profile.jsx";
import React, {useEffect} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AllNotification from "./components/all-notifications/all-notification";
import { useAuth } from "./context/authContext";


function App() {

  const { currentUser } = useAuth() ?? {};
  const navigate = useNavigate();

  
    if(!currentUser){
      navigate("/sign-in")
    }
  

  


  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<AllNotification />} />
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
