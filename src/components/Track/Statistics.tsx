import React from "react";
import { Container, Card } from "react-bootstrap";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import ChartContext from "../../contexts/ChartContext";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
export default function TrackStatistics({ style }: { style?: Record<string, string | number> }) {
  return (
    <Container style={style}>
      <ChartContext.Consumer>
        {({ chartData }) =>
          chartData ? (
            <Card>
              <Radar
                data={chartData}
                options={{
                  scales: {
                    r: {
                      min: 0,
                      max: 100,
                      pointLabels: {
                        font: {
                          size: 16
                        }
                      }
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  // @ts-ignore
                  tooltips: {
                    mode: "label"
                  },
                }}
              />
            </Card>
          ) : (
            <p>Select a track to see analysis</p>
          )
        }
      </ChartContext.Consumer>
    </Container>
  );
}
