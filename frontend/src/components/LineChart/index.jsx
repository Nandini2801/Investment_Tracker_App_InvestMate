// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import React from "react";
import { ResponsiveLine } from "@nivo/line";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const LineChart = ({ data /* see data tab */ }) => (
  <div style={{ height: "35vh", width: "100%" }}>
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      theme={{
        axis: {
          legend: {
            text: {
              fontSize: 18,
              fill: "#333333",
              outlineWidth: 0,
              outlineColor: "transparent",
            },
          },
          ticks: {
            text: {
              fontSize: 18,
              fill: "#333333",
              outlineWidth: 0,
              outlineColor: "transparent",
            },
          },
        },
      }}
      yFormat=" >-.2f"
      gridYValues={[0, 60, 120, 180, 240, 300]}
      curve="cardinal"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 15,
        tickRotation: 0,
        // legend: "transportation",
        legendOffset: 50,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickValues: [0, 60, 120, 180, 240, 300],
        tickPadding: 10,
        tickRotation: 0,
        // legend: "count",
        legendOffset: -55,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableArea={true}
      areaOpacity={0.15}
      enableGridX={false}
      enableGridY={true}
      useMesh={false}
    />
  </div>
);

export default LineChart;
