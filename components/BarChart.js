import React, { PureComponent } from "react";
import { ActivityIndicator } from "react-native";
import { Svg, G, Line, Rect, Text } from "react-native-svg";
import * as d3 from "d3";

const DAYS_OF_WEEK = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const GRAPH_MARGIN = 20;
const GRAPH_BAR_WIDTH = 8;
const colors = {
  axis: "#000000",
  bars: "#56C568",
};

export default class BarChart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return fetch(
      "https://compostapp-28145-default-rtdb.firebaseio.com/users/" +
        this.props.userID +
        "/weekly_inputs.json"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        var userData = [];

        DAYS_OF_WEEK.forEach((day) => {
          userData.push({
            label: day.substring(0, 3),
            value: responseJson[day],
          });
        });

        this.setState(
          {
            isLoading: false,
            dataSource: userData,
          },
          function () {}
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator />;
    }

    // Dimensions
    const SVGHeight = 250;
    const SVGWidth = 400;
    const graphHeight = SVGHeight - 2 * GRAPH_MARGIN;
    const graphWidth = SVGWidth - 2 * GRAPH_MARGIN;
    const data = this.state.dataSource;

    // X scale point
    const xDomain = data.map((item) => item.label);
    const xRange = [0, graphWidth];
    const x = d3.scalePoint().domain(xDomain).range(xRange).padding(1);

    // Y scale linear
    const maxValue = d3.max(data, (d) => d.value);
    const topValue = Math.ceil(maxValue / this.props.round) * this.props.round;
    const yDomain = [0, topValue];
    const yRange = [0, graphHeight];
    const y = d3.scaleLinear().domain(yDomain).range(yRange);

    // top axis and middle axis
    const middleValue = topValue / 2;

    return (
      <Svg width={SVGWidth} height={SVGHeight}>
        <G y={graphHeight + GRAPH_MARGIN}>
          {/* Top value label */}
          <Text
            x={graphWidth}
            textAnchor="end"
            y={y(topValue) * -1 - 5}
            fontSize={12}
            fill="black"
            fillOpacity={0.4}
          >
            {topValue + " " + this.props.unit}
          </Text>

          {/* top axis */}
          <Line
            x1="0"
            y1={y(topValue) * -1}
            x2={graphWidth}
            y2={y(topValue) * -1}
            stroke={colors.axis}
            strokeDasharray={[3, 3]}
            strokeWidth="0.5"
          />

          {/* middle axis */}
          <Line
            x1="0"
            y1={y(middleValue) * -1}
            x2={graphWidth}
            y2={y(middleValue) * -1}
            stroke={colors.axis}
            strokeDasharray={[3, 3]}
            strokeWidth="0.5"
          />

          {/* bottom axis */}
          <Line
            x1="0"
            y1="2"
            x2={graphWidth}
            y2="2"
            stroke={colors.axis}
            strokeWidth="0.5"
          />

          {/* bars */}
          {data.map((item) => (
            <Rect
              key={"bar" + item.label}
              x={x(item.label) - GRAPH_BAR_WIDTH / 2}
              y={y(item.value) * -1}
              rx={2.5}
              width={GRAPH_BAR_WIDTH}
              height={y(item.value)}
              fill={colors.bars}
            />
          ))}

          {/* labels */}
          {data.map((item) => (
            <Text
              key={"label" + item.label}
              fontSize="15"
              x={x(item.label)}
              y="20"
              textAnchor="middle"
              fill="black"
            >
              {item.label}
            </Text>
          ))}
        </G>
      </Svg>
    );
  }
}
