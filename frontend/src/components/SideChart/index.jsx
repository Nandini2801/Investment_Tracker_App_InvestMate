import React from "react";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

function SideChart({ symbol }) {
  return (
    <div>
      <AdvancedRealTimeChart
        theme="light"
        autosize="false"
        symbol={symbol}
      ></AdvancedRealTimeChart>
    </div>
  );
}

export default SideChart;
