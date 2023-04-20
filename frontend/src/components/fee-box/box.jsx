import React from "react";

const Box = ({ title, value }) => {
    return (
      <div
        style={{
          backgroundColor: "#f2f2f2",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
          textAlign: "center",
          width: "200px",
          margin: "10px",
        }}
      >
        <h4>{value}</h4>
        <p>{title}</p>
      </div>
    );
  };
export default Box;
