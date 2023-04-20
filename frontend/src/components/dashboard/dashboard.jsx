import React from "react";
import PaymentBox from "../payment-box/payment-box";
import PieChart from "../pie-chart/pie-chart";

const Dashboard = () => {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ flex: "0 0 100%", maxWidth: "100%" }}>
          <PieChart />
        </div>
        <div style={{ flex: "0 0 100%", maxWidth: "100%", marginTop: "20px" }}>
          <PaymentBox />
        </div>
        <style>
          {`
            @media screen and (max-width: 768px) {
              div > div:first-child {
                margin: 0 auto;
              }
            }
          `}
        </style>
      </div>
    );
  };
  

export default Dashboard;
