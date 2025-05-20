import React from "react";
import SpotifyContext from "../../contexts/SpotifyContext";
import TrackSelector from "../Buttons/TrackSelector";
import ChartContext from "../../contexts/ChartContext";

export default function PlaylistDetails() {
  return (
    <SpotifyContext.Consumer>
      {({ currentSelectedPlaylist }) => (
        <div className="flex flex-col h-full">
          {currentSelectedPlaylist &&
          currentSelectedPlaylist.tracks &&
          currentSelectedPlaylist.tracks.length > 0 ? (
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-4 w-4 rounded-full bg-primary"></span>
                <h3 className="text-lg font-semibold text-text">Playlist Details</h3>
              </div>
              
              <div className="bg-background rounded-lg p-4 mb-4 border border-border">
                <h5 className="text-xl font-semibold text-text mb-2">{currentSelectedPlaylist.name}</h5>
                <ChartContext.Consumer>
                  {({ setChartData }) => (
                    <button
                      className="w-full bg-primary text-text py-2 px-4 rounded-lg hover:bg-primary-dark active:bg-primary-darker transition"
                      onClick={async () => {
                        const trackIdArray = currentSelectedPlaylist.tracks.map(
                          ({ id }) => id
                        );
                        await setChartData(trackIdArray);
                      }}
                    >
                      Show Full Playlist Breakdown
                    </button>
                  )}
                </ChartContext.Consumer>
              </div>

              <div className="overflow-y-auto flex-1 pr-2">
                <ul className="space-y-2">
                  {currentSelectedPlaylist.tracks.map((track) => (
                    <TrackSelector
                      key={track.id}
                      track={track}
                    />
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-text-secondary">Select a playlist to view details</p>
            </div>
          )}
        </div>
      )}
    </SpotifyContext.Consumer>
  );
}
