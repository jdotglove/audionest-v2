import React from "react";

import PlaylistContext from "../../contexts/PlaylistContext";
import PlaylistProvider from "../../providers/PlaylistProvider";

export default function PlaylistSelector({
  setSelectedPlaylist,
  playlist,
}: {
  setSelectedPlaylist: Function;
  playlist: Audionest.Playlist;
}) {
  return (
    <PlaylistProvider>
      <PlaylistContext.Consumer>
        {({ getPlaylistTracks }) => (
          <button
            className="flex justify-between items-center border border-[#98611F] text-white rounded-full py-2 px-4 w-full mb-2 hover:bg-[#98611F] hover:text-[#2D3748] transition-all duration-300"
            onClick={async () => {
              await setSelectedPlaylist({
                uri: playlist.uri,
                name: playlist.name,
                tracks: await getPlaylistTracks(playlist.id),
              });
            }}
          >
            {playlist ? playlist.name : ""}
          </button>
        )}
      </PlaylistContext.Consumer>
    </PlaylistProvider>
  );
}
