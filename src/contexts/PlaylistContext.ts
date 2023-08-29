import { createContext } from 'react';

const PlaylistContext = createContext({
  addToPlaylistBuilder: undefined,
  clearPlaylistBuilder: undefined,
  getPlaylistTracks: undefined,
  removeFromPlaylistBuilder: undefined,
  toggleShowPlaylistBuilder: undefined,
  savePlaylist: undefined,
  selectedTracks: undefined,
  showPlaylistBuilder: undefined,
});

export default PlaylistContext;