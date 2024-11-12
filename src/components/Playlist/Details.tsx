import React from "react";
import SpotifyContext from "../../contexts/SpotifyContext";
import TrackSelector from "../Buttons/TrackSelector";
import ChartContext from "../../contexts/ChartContext";

export default function PlaylistDetails() {
  return (
    <SpotifyContext.Consumer>
      {({ currentSelectedPlaylist }) => (
        <div className="container mx-auto py-6">
          {currentSelectedPlaylist &&
            currentSelectedPlaylist.tracks &&
            currentSelectedPlaylist.tracks.length > 0 && (
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-[#1B1F24] text-[#F2E8CF] rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-bold mb-4">Selected Playlist Details:</h3>
                  <div className="bg-[#2D3748] p-4 rounded-lg mb-4">
                    <h5 className="text-xl font-semibold">{currentSelectedPlaylist.name}</h5>
                    <ChartContext.Consumer>
                      {({ setChartData }) => (
                        <button
                          className="mt-4 bg-[#98611F] text-white py-2 px-4 rounded-md hover:bg-[#0aabb0] hover:text-[#1B1F24] transition duration-300"
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
                  <div className="overflow-y-auto max-h-[48rem]">
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
              </div>
            )}
        </div>
      )}
    </SpotifyContext.Consumer>
  );
}
