import React from "react";
import PlaylistDisplay from "./Display";
import PlaylistDetails from "./Details";
import TrackStatistics from "../Track/Statistics";

export default function PlaylistAnalysisContainer() {
  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#2D3748] p-4 rounded-lg shadow-lg">
          <PlaylistDisplay />
        </div>
        <div className="bg-[#2D3748] p-4 rounded-lg shadow-lg">
          <PlaylistDetails />
        </div>
        <div className="bg-[#2D3748] p-4 rounded-lg shadow-lg">
          <TrackStatistics />
        </div>
      </div>
    </div>
  );
}
