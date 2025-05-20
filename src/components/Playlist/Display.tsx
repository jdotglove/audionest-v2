import React, { Fragment } from "react";

import SpotifyContext from "../../contexts/SpotifyContext";
import PlaylistSelector from "../Buttons/PlaylistSelector";
import PlaylistProvider from "../../providers/PlaylistProvider";

export default function PlaylistDisplay() {
  return (
    <SpotifyContext.Consumer>
      {({ playlists, setSelectedPlaylist }) => (
        <div className="flex flex-col h-full">
          {playlists.length > 0 ? (
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-4 w-4 rounded-full bg-primary"></span>
                <h3 className="text-lg font-semibold text-text">Your Playlists</h3>
              </div>
              <div className="overflow-y-auto flex-1 pr-2">
                <ul className="space-y-2">
                  {playlists.map((playlist, idx) => (
                    <Fragment key={idx}>
                      <PlaylistSelector
                        playlist={playlist}
                        setSelectedPlaylist={setSelectedPlaylist}
                      />
                    </Fragment>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-text-secondary">No playlists found</p>
            </div>
          )}
        </div>
      )}
    </SpotifyContext.Consumer>
  );
}
