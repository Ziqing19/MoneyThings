import React from "react";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import propTypes from "prop-types";

export default function MyScatterPlot(props) {
  return (
    <ResponsiveScatterPlot
      data={props.data}
      margin={{ top: 50, right: 60, bottom: 80, left: 60 }}
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
      blendMode="multiply"
      axisTop={null}
      axisRight={{
        orient: "right",
        tickSize: 0,
        tickPadding: -5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: -60,
      }}
      axisBottom={null}
      axisLeft={null}
      enableGridX={false}
      enableGridY={false}
      crosshairType="x"
      colors={["rgba(220,192,163,0)", "rgb(215,119,103)"]}
    />
  );
}

MyScatterPlot.propTypes = {
  data: propTypes.array.isRequired,
};
