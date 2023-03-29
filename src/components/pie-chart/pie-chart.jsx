import React from "react";
import { Pie } from "react-chartjs-2";
import 'chart.js/auto';

const feeDistribution={
  Tution: "Tution",
  CRT: "CRT",
  DSA: "DSA"
}


const data = {
  labels: [feeDistribution.Tution, feeDistribution.CRT,feeDistribution.DSA],
  datasets: [
    {
      data: [300, 100, 50],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverOffset: 4,
    },
  ],
};

const options = {
  plugins: {
    title: {
      display: true,
      text: "Fee Distribution",
    },
  },
};

const PieChart = () => {
  return <Pie data={data} options={options} />;
};

export default PieChart;
