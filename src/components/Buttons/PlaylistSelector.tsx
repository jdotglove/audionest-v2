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
            className="w-full bg-background text-text rounded-lg py-2 px-4 border border-border hover:bg-surface hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-between group"
            onClick={async () => {
              await setSelectedPlaylist({
                uri: playlist.uri,
                name: playlist.name,
                tracks: await getPlaylistTracks(playlist.id),
              });
            }}
          >
            <span className="font-medium truncate">{playlist ? playlist.name : ""}</span>
            <span className="text-text-secondary group-hover:text-primary transition-colors">
              →
            </span>
          </button>
        )}
      </PlaylistContext.Consumer>
    </PlaylistProvider>
  );
}
