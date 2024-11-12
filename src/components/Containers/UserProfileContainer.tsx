import React, { Fragment } from "react";
import ArtistProvider from "../../providers/ArtistProvider";
import ArtistContext from "../../contexts/ArtistContext";
import TrackProvider from "../../providers/TrackProvider";
import TrackContext from "../../contexts/TrackContext";
import SpotifyContext from "../../contexts/SpotifyContext";

export default function UserProfileContainer() {
  return (
    <SpotifyContext.Consumer>
      {({ topTracks, topArtists }) => (
        <div className="container mx-auto py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Top Tracks Section */}
            <div className="bg-[#2D3748] rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-bold text-[#F2E8CF]">
                Here are your current top tracks
              </h3>
              {topTracks && (
                <div className="overflow-y-auto h-[28dvh] lg:h-[60dvh]">
                  {topTracks.map((trackId, index) => (
                    <TrackProvider key={`track-${trackId}`} trackId={trackId}>
                      <TrackContext.Consumer>
                        {({ name, artists }) => (
                          <div className="text-[#F2E8CF] py-2">
                            {index + 1}. {name} -{" "}
                            {artists[0] && artists[0].name}
                          </div>
                        )}
                      </TrackContext.Consumer>
                    </TrackProvider>
                  ))}
                </div>
              )}
            </div>

            {/* Top Artists Section */}
            <div className="bg-[#2D3748] rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-bold text-[#F2E8CF]">
                Here are your current top artists
              </h3>
              {topArtists.length > 0 && (
                <div className="overflow-y-auto h-[28dvh] lg:h-[60dvh]">
                  {topArtists.map((artistId, index) => (
                    <ArtistProvider
                      key={`artist-${artistId}`}
                      artistId={artistId}
                    >
                      <ArtistContext.Consumer>
                        {({ name, popularity }) => (
                          <div className="text-[#F2E8CF] py-2">
                            {index + 1}. {name} - Popularity: {popularity}
                          </div>
                        )}
                      </ArtistContext.Consumer>
                    </ArtistProvider>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </SpotifyContext.Consumer>
  );
}
