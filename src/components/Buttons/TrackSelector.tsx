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
          className="bg-[#37474F] text-[#F2E8CF] p-3 rounded-lg cursor-pointer mb-2 hover:bg-[#98611F] hover:text-[#1B1F24] transition-all duration-300"
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
