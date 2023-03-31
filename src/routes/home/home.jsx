import Box from "../../components/fee-box/box";
import Dashboard from "../../components/dashboard/dashboard";
import React from "react";
import NotificationTableHome from "../../components/notification/notification";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  if(!currentUser){
    navigate("/sign-in")
  }
  // console.log(currentUser);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box value={currentUser && currentUser.feePaid} title={"Fee paid"} />
        <Box value={currentUser && currentUser.feeLeft} title={"Fee due"} />
        <Box
          value={currentUser && currentUser.departmentFee}
          title={"Total fee"}
        />
      </div>
      <NotificationTableHome />
    </div>
  );
};

export default Home;
