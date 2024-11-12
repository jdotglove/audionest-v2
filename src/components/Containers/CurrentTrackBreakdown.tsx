import React, { Fragment, useContext, useEffect } from "react";
import RecommendationContext from "../../contexts/RecommendationContext";
import ChartContext from "../../contexts/ChartContext";
import TrackStatistics from "../Track/Statistics";

export default function CurrentTrackBreakdown() {
  const { currentTrackBreakdown, noVibesAlert } = useContext(RecommendationContext);
  const { setChartData } = useContext(ChartContext);

  useEffect(() => {
    if (currentTrackBreakdown && currentTrackBreakdown.item) {
      setChartData([currentTrackBreakdown.item.id]);
    }
  }, [currentTrackBreakdown, setChartData]);

  return (
    <Fragment>
      {currentTrackBreakdown && currentTrackBreakdown.item ? (
        <Fragment>
          <div className="text-lg text-[#F2E8CF] mb-4">
            Current Item: <span className="font-semibold">{currentTrackBreakdown.item.name}</span> -{" "}
            <span className="font-semibold">{currentTrackBreakdown.item.artists[0].name}</span>
          </div>
          <div className="bg-[#2D3748] p-4 rounded-lg shadow-lg">
            <TrackStatistics />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          {noVibesAlert && (
            <div className="text-white p-4 rounded-lg mt-4">
              Play a track to check out your current vibes
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
