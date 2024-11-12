import React from "react";
import NextImage from "next/image";
import CurrentTrackBreakdown from "../Containers/CurrentTrackBreakdown";
import { parseUriForId } from "../../utils/spotify";
import placeholderImg from "../../../public/placeholder.png";
import RecommendationContext from "../../contexts/RecommendationContext";
import PlaylistContext from "../../contexts/PlaylistContext";
import ChartContext from "../../contexts/ChartContext";

export default function RecommendationDisplay({ user }) {
  const userSpotifyId = parseUriForId(user.uri);
  const { chartData } = React.useContext(ChartContext);

  return (
    <React.Fragment>
      <RecommendationContext.Consumer>
        {({
          addToQueue,
          atLeastOneSeedSelected,
          clearSelectedSeeds,
          generateRecommendations,
          recommendedTrackList,
          retrieveCurrentTrackBreakdown,
          currentTrackBreakdown,
          seedCurrentVibes,
        }) => (
          <React.Fragment>
            <div className="container bg-[#37474F] mx-auto px-4 py-6 gap-3 flex flex-row justify-center lg:justify-start">
              <div className="lg:w-1/2">
                <button
                  className="mt-1 bg-[#0097A7] text-[#2D3748] py-2 px-4 rounded hover:bg-[#0aabb0] transition"
                  onClick={generateRecommendations}
                  disabled={!atLeastOneSeedSelected()}
                >
                  Generate Track Crate
                </button>
              </div>
              <div className="hidden lg:flex lg:w-1/2 gap-3">
                <button
                  className="mt-1 bg-[#0097A7] text-[#2D3748] text-sm lg:text-lg py-2 px-4 rounded hover:bg-[#0aabb0] transition"
                  onClick={() => retrieveCurrentTrackBreakdown(userSpotifyId)}
                >
                  Retrieve Current Vibes
                </button>{" "}
                {currentTrackBreakdown && currentTrackBreakdown.item ? (
                  <button
                    className="mt-1 bg-[#0097A7] text-[#2D3748] text-sm lg:text-lg py-2 px-4 rounded hover:bg-[#0aabb0] transition"
                    onClick={async () => {
                      await clearSelectedSeeds();
                      await seedCurrentVibes(
                        currentTrackBreakdown.item,
                        chartData
                      );
                      await generateRecommendations();
                    }}
                  >
                    Generate Similar Vibes
                  </button>
                ) : (
                  <React.Fragment />
                )}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2">
                <div className="bg-[#1B1F24] text-[#F2E8CF] m-4 rounded-lg shadow-lg max-h-[40dvh] overflow-y-auto mx-2">
                  {!!recommendedTrackList.length && (
                    <ul className="list-none p-4">
                      {recommendedTrackList.map((track) => (
                        <li
                          className="flex justify-between items-center mb-2"
                          key={track.id}
                        >
                          {track.album.images[0] ? (
                            <img
                              src={track.album.images[0]?.url}
                              height={55}
                              width={55}
                              className="rounded-full"
                              alt="Track Picture"
                            />
                          ) : (
                            <img
                              src={placeholderImg.src}
                              height={55}
                              width={55}
                              alt="Default Track Picture"
                            />
                          )}
                          <span className="px-2 text-sm">
                            {track.name} - {track.artists[0].name}
                          </span>
                          <PlaylistContext.Consumer>
                            {({ addToPlaylistBuilder }) => (
                              <div className="flex gap-2">
                                <button
                                  className="text-[#0097A7] hover:underline"
                                  onClick={() => addToPlaylistBuilder(track)}
                                >
                                  Add To Playlist
                                </button>
                                <button
                                  className="text-[#0097A7] hover:underline"
                                  onClick={() =>
                                    addToQueue(userSpotifyId, track)
                                  }
                                >
                                  Queue
                                </button>
                              </div>
                            )}
                          </PlaylistContext.Consumer>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="hidden lg:block lg:w-1/2">
                <CurrentTrackBreakdown />
              </div>
            </div>
          </React.Fragment>
        )}
      </RecommendationContext.Consumer>
    </React.Fragment>
  );
}
