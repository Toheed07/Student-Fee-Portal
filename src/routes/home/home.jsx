import Box from "../../components/box/box";
import Dashboard from "../../components/dashboard/dashboard";
import React from "react";

import { useAuth } from "../../context/authContext";

const Home = () => {
  const { currentUser } = useAuth();
  // console.log(currentUser);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box value={currentUser && currentUser.feePaid} title={"Fee paid"} />
        <Box value={currentUser && currentUser.feeLeft} title={"Fee left"} />
        <Box
          value={currentUser && currentUser.departmentFee}
          title={"Total fee"}
        />
      </div>
      <Dashboard />
    </div>
  );
};

export default Home;
