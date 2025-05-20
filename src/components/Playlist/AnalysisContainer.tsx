import React from "react";
import PlaylistDisplay from "./Display";
import PlaylistDetails from "./Details";
import TrackStatistics from "../Track/Statistics";

export default function PlaylistAnalysisContainer() {
  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface rounded-lg shadow-lg p-4 border border-border">
          <PlaylistDisplay />
        </div>
        <div className="bg-surface rounded-lg shadow-lg p-4 border border-border">
          <PlaylistDetails />
        </div>
        <div className="bg-surface rounded-lg shadow-lg p-4 border border-border">
          <TrackStatistics />
        </div>
      </div>
    </div>
  );
}
