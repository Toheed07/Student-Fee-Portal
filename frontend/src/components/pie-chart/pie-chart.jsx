import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { fetchStudents } from "../../utils/firebase/firebase";

const feeStatistics = {
  Paid: "Paid",
  NotPaid: "Not Paid",
  PartialPaid: "Partial Paid",
};

// eslint-disable-next-line no-unused-vars
const options = {
  plugins: {
    title: {
      display: true,
      text: "Fee Distribution",
    },
  },
};

const limitNum = 0;

const FeePieChart = () => {
  const [studentslist, setStudentsList] = useState([]);

  const { paid, notPaid, partialPaid } = studentslist.reduce(
    (acc, student) => {
      if (student.feePaid === 0) {
        return { ...acc, notPaid: acc.notPaid + 1 };
      } else if (student.feePaid > 0 && student.feePaid < student.departmentFee) {
        return { ...acc, partialPaid: acc.partialPaid + 1 };
      } else if (student.feePaid >= student.feeDue) {
        return { ...acc, paid: acc.paid + 1 };
      } else {
        return acc;
      }
    },
    { paid: 0, notPaid: 0, partialPaid: 0 }
  );

  const data = {
    labels: [
      feeStatistics.Paid,
      feeStatistics.NotPaid,
      feeStatistics.PartialPaid,
    ],
    datasets: [
      {
        data: [paid, notPaid, partialPaid],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverOffset: 4,
      },
    ],
  };
  useEffect(() => {
    fetchStudents(limitNum)
      .then((data) => {
        setStudentsList(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div style={{ margin: "auto" }}>
        <Pie data={data} />
      </div>
    </>
  );
};

export default FeePieChart;
