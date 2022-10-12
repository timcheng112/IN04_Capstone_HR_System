import React from "react";
import { Doughnut } from "react-chartjs-3";

export default function UserDashboard() {
  const DoughData = {
    labels: ["Red", "Green", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
      }
    ]
  };

  const options = {
    legend: {
      display: true,
      position: "bottom"
    }
  };

  return (
    <div>
      <Doughnut data={DoughData} options={options} />
    </div>
  );
}
