import React from "react";
import RecommendationSeedSearch from "./SeedSearch";
import RecommendationSelection from "./Selection";
import RecommendationDisplay from "./Display";
import RecommendationProvider from "../../providers/RecommendationProvider";
import RecommendationContext from "../../contexts/RecommendationContext";
import PlaylistProvider from "../../providers/PlaylistProvider";
import PlaylistContext from "../../contexts/PlaylistContext";
import SpotifyContext from "../../contexts/SpotifyContext";

export default function RecommendationGeneratorContainer() {
  return (
    <SpotifyContext.Consumer>
      {({ isLoggedIn, user }) =>
        !isLoggedIn ? (
          <div className="container mx-auto px-4 py-6">
            <h2 className="text-xl font-bold text-text-secondary pt-3">
              Please log in to see recommendations.
            </h2>
          </div>
        ) : (
          <PlaylistProvider>
            <RecommendationProvider>
              <div className="min-h-[90dvh] container bg-surface mx-auto px-4 py-6">
                <RecommendationContext.Consumer>
                  {({
                    dismissAddToQueueAlert,
                    selectedSeedArtists,
                    selectedSeedTracks,
                    clearSelectedSeeds,
                    showQueueAlert,
                    queueAddResult,
                    targetAudioFeaturesMap,
                    toggleShowSeedSearch,
                  }) => (
                    <div className="bg-background text-text rounded-lg shadow-lg p-4 mb-4">
                      <h5 className="text-lg font-semibold">
                        Selected Seeds (Max 5 in total)
                      </h5>
                      <div className="mt-2">
                        <p>
                          <strong>Tracks: </strong>
                          {selectedSeedTracks.length > 0 ? (
                            selectedSeedTracks.map((trackObj, idx) => (
                              <React.Fragment key={trackObj.id}>
                                {trackObj.name}
                                {selectedSeedTracks[idx + 1] && <span>, </span>}
                              </React.Fragment>
                            ))
                          ) : (
                            <span>No tracks selected.</span>
                          )}
                        </p>
                        <p>
                          <strong>Artists: </strong>
                          {selectedSeedArtists.length > 0 ? (
                            selectedSeedArtists.map((artistObj, idx) => (
                              <React.Fragment key={artistObj.id}>
                                {artistObj.name}
                                {selectedSeedArtists[idx + 1] && (
                                  <span>, </span>
                                )}
                              </React.Fragment>
                            ))
                          ) : (
                            <span>No artists selected.</span>
                          )}
                        </p>
                        <p>
                          <strong>Target Audio Features: </strong>
                          {targetAudioFeaturesMap ? (
                            Object.keys(targetAudioFeaturesMap).map(
                              (audioFeatureLabel, idx) => (
                                <React.Fragment key={audioFeatureLabel}>
                                  {audioFeatureLabel}:{" "}
                                  {Number.parseFloat(
                                    targetAudioFeaturesMap[audioFeatureLabel]
                                  ).toFixed(2)}
                                  {Object.keys(targetAudioFeaturesMap)[
                                    idx + 1
                                  ] && <span>, </span>}
                                </React.Fragment>
                              )
                            )
                          ) : (
                            <span>No features selected.</span>
                          )}
                        </p>
                      </div>
                      <div className="mt-4 gap-x-2 flex justify-between">
                        <button
                          className="bg-primary text-text py-2 px-4 rounded hover:bg-primary-dark transition"
                          onClick={() => toggleShowSeedSearch(true)}
                        >
                          Add Seeds
                        </button>
                        <button
                          className="bg-secondary text-text py-2 px-4 rounded hover:bg-secondary-dark transition"
                          onClick={clearSelectedSeeds}
                        >
                          Clear Seeds
                        </button>

                        <PlaylistContext.Consumer>
                          {({ toggleShowPlaylistBuilder }) => (
                            <button
                              className="bg-surface text-text py-2 px-4 rounded hover:bg-surface-dark transition"
                              onClick={() => toggleShowPlaylistBuilder(true)}
                            >
                              View Playlist
                            </button>
                          )}
                        </PlaylistContext.Consumer>
                      </div>
                      {showQueueAlert && (
                        <div
                          className={`mt-4 p-3 rounded ${
                            queueAddResult === "success"
                              ? "bg-success text-text"
                              : "bg-error text-text"
                          }`}
                        >
                          {queueAddResult === "success"
                            ? "Added To Queue!"
                            : "Error Adding To Queue"}
                          <button
                            className="float-right hover:text-text-secondary transition text-3xl"
                            onClick={dismissAddToQueueAlert}
                          >
                            &times;
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </RecommendationContext.Consumer>
                <RecommendationSeedSearch />
                <div className="mt-6">
                  <RecommendationDisplay user={user} />
                </div>
                <RecommendationSelection user={user} />
              </div>
            </RecommendationProvider>
          </PlaylistProvider>
        )
      }
    </SpotifyContext.Consumer>
  );
}
