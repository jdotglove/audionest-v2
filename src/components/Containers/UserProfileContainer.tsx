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
        <div className="container mx-auto py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Tracks Section */}
            <div className="bg-surface rounded-lg shadow-lg p-6 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-4 w-4 rounded-full bg-primary"></span>
                <h3 className="text-lg font-semibold text-text">Your Top Tracks</h3>
              </div>
              {topTracks && topTracks.length > 0 ? (
                <div className="overflow-y-auto h-[60dvh] pr-2">
                  <ul className="space-y-2">
                    {topTracks.map((trackId, index) => (
                      <TrackProvider key={`track-${trackId}`} trackId={trackId}>
                        <TrackContext.Consumer>
                          {({ name, artists }) => (
                            <li className="bg-background text-text p-3 rounded-lg flex items-center hover:bg-surface border border-transparent hover:border-border transition group">
                              <div className="flex items-center gap-3 w-full">
                                <span className="text-text-secondary font-medium w-6">
                                  {index + 1}.
                                </span>
                                <div className="flex items-center justify-between w-full">
                                  <span className="font-medium group-hover:text-primary transition-colors">
                                    {name}
                                  </span>
                                  <span className="text-sm text-text-secondary">
                                    {artists[0] && artists[0].name}
                                  </span>
                                </div>
                              </div>
                            </li>
                          )}
                        </TrackContext.Consumer>
                      </TrackProvider>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[60dvh]">
                  <p className="text-text-secondary">No top tracks found</p>
                </div>
              )}
            </div>

            {/* Top Artists Section */}
            <div className="bg-surface rounded-lg shadow-lg p-6 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-4 w-4 rounded-full bg-primary"></span>
                <h3 className="text-lg font-semibold text-text">Your Top Artists</h3>
              </div>
              {topArtists && topArtists.length > 0 ? (
                <div className="overflow-y-auto h-[60dvh] pr-2">
                  <ul className="space-y-2">
                    {topArtists.map((artistId, index) => (
                      <ArtistProvider
                        key={`artist-${artistId}`}
                        artistId={artistId}
                      >
                        <ArtistContext.Consumer>
                          {({ name, popularity }) => (
                            <li className="bg-background text-text p-3 rounded-lg flex items-center hover:bg-surface border border-transparent hover:border-border transition group">
                              <div className="flex items-center gap-3 w-full">
                                <span className="text-text-secondary font-medium w-6">
                                  {index + 1}.
                                </span>
                                <div className="flex items-center justify-between w-full">
                                  <span className="font-medium group-hover:text-primary transition-colors">
                                    {name}
                                  </span>
                                  <span className="text-sm text-text-secondary">
                                    Popularity: {popularity}
                                  </span>
                                </div>
                              </div>
                            </li>
                          )}
                        </ArtistContext.Consumer>
                      </ArtistProvider>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[60dvh]">
                  <p className="text-text-secondary">No top artists found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </SpotifyContext.Consumer>
  );
}
