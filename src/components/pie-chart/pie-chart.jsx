import React from "react";
import { Pie } from "react-chartjs-2";
import 'chart.js/auto';

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverOffset: 4,
    },
  ],
};

const options = {
  plugins: {
    title: {
      display: true,
      text: "My Pie Chart",
    },
  },
};

const PieChart = () => {
  return <Pie data={data} options={options} />;
};

export default PieChart;
