import * as React from "react";
import { Chart } from "react-google-charts";

export default function AmountOverviewChart({ data }) {
  const chartData = [
    ["Amount", "Total Sell,  Cash and Due"],
    ["Total Sell", data.totalSell],
    ["Cash", data.totalCashOnSell],
    ["Due", data.totalDueOnSell],
  ];

  const options = {
    title: "Total Sell, Cash and Due",
    is3D: true,
  };

  return (
    <div style={{ display: "grid", placeContent: "center", flexGrow: 1 }}>
      <Chart
        chartType="PieChart"
        data={chartData}
        options={options}
        height="350px"
        legendToggle
      />
    </div>
  );
}
