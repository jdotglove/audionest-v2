import React, { Fragment } from "react";

import SpotifyContext from "../../contexts/SpotifyContext";
import PlaylistSelector from "../Buttons/PlaylistSelector";
import PlaylistProvider from "../../providers/PlaylistProvider";

export default function PlaylistDisplay() {
  return (
    <SpotifyContext.Consumer>
      {({ playlists, setSelectedPlaylist }) => (
        <div className="container mx-auto py-6">
          {playlists.length > 0 && (
            <div className="rounded-lg p-4 w-full max-w-xs mx-auto">
              <h3 className="text-lg font-bold text-[#F2E8CF] mb-4">User Playlists</h3>
              <div className="overflow-y-auto" style={{ height: "50rem" }}>
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
          )}
        </div>
      )}
    </SpotifyContext.Consumer>
  );
}
