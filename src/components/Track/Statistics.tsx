import React from "react";
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

export default function TrackStatistics({
  style,
}: {
  style?: Record<string, string | number>;
}) {
  return (
    <ChartContext.Consumer>
      {({ chartData }) =>
        chartData ? (
          <div className="gap-4 flex flex-col">
            {chartData.labels.map((label: string, idx) => (
          <div
            key={label}
            className="bg-[#37474F] p-3 rounded-lg flex justify-between items-center"
          >
            <span className="font-semibold">{label}</span>
            <span>{chartData?.datasets[0]?.data[idx]?.toFixed(2)}</span>
          </div>
        ))}
          </div>
        ) : (
          <p className="text-[#F2E8CF] text-center">
            Select a track to see analysis
          </p>
        )
      }
    </ChartContext.Consumer>
  );
}
