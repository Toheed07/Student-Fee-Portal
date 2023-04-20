import Home from "./routes/home/home";
import NavBar from "./routes/navigation/navigation";
import SignInForm from "./components/sign-in-form/sign-in-form";
import SignUpForm from "./components/sign-up-form/sign-up-form";
import Profile from "./routes/profile/profile.jsx";
import React from "react";
import { Routes, Route } from "react-router-dom";
import AllNotification from "./components/all-notifications/all-notification";
import StudentList from "./components/student-table/student-table";
import { useAuth } from "./context/authContext";
import StudentProfile from "./components/student-profile/student-profile";
import AddStudentForm from "./components/form-student/form-student";
import Departments from "./components/departments/departments";
import Payment from "./components/form-payment/Payment";


function App() {
  const { currentUser, userRole } = useAuth() ?? {};

  return (
    <>
      <NavBar />
      {currentUser ? (
        <div>
          {userRole === "admin" ? (
            <>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="sign-in" element={<SignInForm />} />
                <Route path="sign-up" element={<SignUpForm />} />
                <Route path="profile" element={<Profile />} />
                <Route path="notifications" element={<AllNotification />} />
                <Route path="departments" element={<Departments />} />
                <Route
                  path="students-list/*"
                  element={<StudentList limitNum={0} />}
                >
                  <Route
                    path="student-profile/:id"
                    element={<StudentProfile />}
                  />
                  <Route path="add-student" element={<AddStudentForm />} />
                </Route>
                <Route path="add-student" element={<AddStudentForm />} />
                <Route
                  path="student-profile/:id"
                  element={<StudentProfile />}
                />
              </Routes>
            </>
          ) : (
            <>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignInForm />} />
                <Route path="/sign-up" element={<SignUpForm />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<AllNotification />} />
                <Route path="/payments" element={<Payment />} />

              </Routes>
            </>
          )}
        </div>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<AllNotification />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;

// eslint-disable-next-line no-lone-blocks
{
  /* <Routes>
  <Route path="/" element={<Home />} />
  <Route index element={<NavBar />} />
<Route path="/sign-in" element={<SignInForm />} />
<Route path="/sign-up" element={<SignUpForm />} />
</Routes> */
}
