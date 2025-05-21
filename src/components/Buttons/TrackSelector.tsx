import React from "react";
import ChartContext from "../../contexts/ChartContext";

export default function TrackSelector({
  track,
}: {
  track: Audionest.Track;
}) {
  return (
    <ChartContext.Consumer>
      {({ setChartData }) => (
        <div
          className="bg-surface text-text p-3 rounded-lg cursor-pointer mb-2 hover:bg-primary hover:text-text transition-all duration-300"
          onClick={async () => {
            await setChartData([track.id]);
          }}
        >
          {track ? track.name : ""}
        </div>
      )}
    </ChartContext.Consumer>
  );
}
