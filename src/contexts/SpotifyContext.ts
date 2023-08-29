import { createContext } from 'react';

const SpotifyContext = createContext({
  acknowledgeInfoModal: undefined,
  artistSearchResults: undefined as Array<any>,
  checkIfSeenInfoModal: undefined,
  currentSelectedPlaylist: undefined,
  currentSelectedTracks: undefined,
  isLoggedIn: undefined,
  login: undefined,
  playlists: undefined,
  searchItems: undefined,
  setSelectedPlaylist: undefined,
  // setSelectedTracks: undefined,
  trackSearchResults: undefined as Array<any>,
  topArtists: undefined as Array<any>,
  topTracks: undefined as Array<any>,
  user: undefined as Audionest.User,
});

export default SpotifyContext;