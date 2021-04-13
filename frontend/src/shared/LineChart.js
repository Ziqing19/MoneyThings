import React from "react";
import { ResponsiveLine } from "@nivo/line";
import propTypes from "prop-types";

export default function MyLineChart(props) {
  const interval = props.interval === undefined ? 2 : props.interval;

  const axisYConfig = {
    tickSize: props.isPrimaryGraph ? 0 : 5,
    tickPadding: props.isPrimaryGraph ? 10 : 5,
    tickRotation: 0,
    legendOffset: -40,
    legendPosition: "middle",
  };

  const axisXConfig = {
    format: "%b %d",
    tickSize: 10,
    tickPadding: 15,
    tickValues: `every ${interval} days`,
  };

  const legendConfig = [
    {
      anchor: "bottom",
      direction: "row",
      justify: false,
      translateX: 0,
      translateY: 90,
      itemsSpacing: 0,
      itemDirection: "left-to-right",
      itemWidth: 100,
      itemHeight: 40,
      itemOpacity: 0.75,
      symbolSize: 20,
      symbolShape: "circle",
      symbolBorderColor: "rgba(0, 0, 0, .5)",
      effects: [
        {
          on: "hover",
          style: {
            itemBackground: "rgba(0, 0, 0, .03)",
            itemOpacity: 1,
          },
        },
      ],
    },
  ];

  return (
    <ResponsiveLine
      margin={{ top: 50, right: 80, bottom: 80, left: 60 }}
      data={props.data}
      xScale={{
        type: "time",
        format: "%Y-%m-%d",
        useUTC: false,
        precision: "day",
      }}
      xFormat="time:%Y-%m-%d"
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
      }}
      axisLeft={props.isPrimaryGraph ? null : axisYConfig}
      axisRight={!props.isPrimaryGraph ? null : axisYConfig}
      axisBottom={props.isPrimaryGraph ? null : axisXConfig}
      yFormat=" >-.2f"
      axisTop={null}
      pointLabelYOffset={-12}
      enableSlices={"x"}
      legends={props.isPrimaryGraph ? [] : legendConfig}
      curve="cardinal"
      enableGridX={false}
      enableGridY={!props.isPrimaryGraph}
      crosshairType="x"
      colors={[
        props.isPrimaryGraph ? "rgba(220,192,163,0)" : "rgb(141,203,186)",
        "rgb(215,119,103)",
      ]}
      pointSize={6}
      pointBorderWidth={2}
      lineWidth={props.isPrimaryGraph ? 2 : 2}
      pointBorderColor={{ from: "color", modifiers: [] }}
    />
  );
}

MyLineChart.propTypes = {
  data: propTypes.array.isRequired,
  isPrimaryGraph: propTypes.bool.isRequired,
  interval: propTypes.string,
};
