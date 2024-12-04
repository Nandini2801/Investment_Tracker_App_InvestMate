import React from "react";
import { ResponsivePie } from "@nivo/pie";

export default function PieChart({ data, fill }) {
  return (
    <div style={{ height: "25vh" }}>
      <ResponsivePie
        enableArcLinkLabels={false}
        data={data}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        // padding={{ right: 10, left: 10 }}
        // tooltip={ToolTip}
        innerRadius={0.5}
        sortByValue={true}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        colors={{ scheme: "set3" }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={3}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="black"
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={fill}
      />
    </div>
  );
}
