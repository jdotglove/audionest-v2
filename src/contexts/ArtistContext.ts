import { createContext } from 'react';

const ArtistContext = createContext({
  artistId: '',
  albums: undefined,
  name: '',
  genres: [],
  popularity: 0,
  uri: '',
  tracks: [],
});

export default ArtistContext;