import React from "react";

const PaymentBox = () => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "20px",
        position: "relative",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <p style={{ fontWeight: "bold", margin: "0" }}>Payment Information:</p>
      <button
        style={{
          background: "linear-gradient(to bottom, #4e8cff, #3c6edb)",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "10px",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentBox;
