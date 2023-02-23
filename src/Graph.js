import React from "react";
import { scaleLog } from "d3-scale";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { winners: 1, payouts: 60 },
  { winners: 2, payouts: 50 },
  { winners: 3, payouts: 40 },
  { winners: 4, payouts: 30 },
  { winners: 5, payouts: 10 },
];

function Graph(props) {
  console.log(props);
  const { data } = props;
  const makedata = (data) => {
    const graphData = [];
    data.forEach((item, index) => {
      graphData[index] = {
        winners: index + 1,
        payouts: item,
      };
    });
    return graphData;
  };
  const graphDataContainer = makedata(data);
  const logScale = scaleLog()
    .domain([Math.pow(10, 0), Math.pow(10, 5)])
    .range([0, 1]);
  const logScale2 = scaleLog()
    .domain([Math.pow(10, 0), Math.pow(10, 7)])
    .range([0, 1]);

  console.log(graphDataContainer);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={graphDataContainer}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="winners"
          type="number"
          scale="log"
          domain={[Math.pow(10, 0), Math.pow(10, 5)]}
          tickFormatter={(value) => `10^${Math.log10(value)}`}
          ticks={logScale.ticks()}
        />
        <YAxis
          dataKey="payouts"
          scale="log"
          domain={[Math.pow(10, 0), Math.pow(10, 5)]}
          tickFormatter={(value) => `10^${Math.log10(value)}`}
          //   ticks={logScale2.ticks()}
        />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="payouts" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Graph;
