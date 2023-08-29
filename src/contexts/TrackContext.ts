import { createContext } from 'react';

const TrackContext = createContext({
  getTrackArtist: undefined,
  album: undefined,
  artists: [],
  audioFeatures: {
    acousticness: 0,
    analysisUrl: '',
    danceability: 0,
    energy: 0,
    instrumentalness: 0,
    key: 0,
    liveness: 0,
    loudness: 0,
    mode: 0,
    speechiness: 0,
    uri: '',
    tempo: 0,
    timeSignature: 0,
    valence: 0,
  },
  availableMarkets: [],
  durationMs: 0,
  explicit: false,
  name: '',
  popularity: 0,
  uri: '',
  trackNumber: 0,
  trackId: undefined,
});

export default TrackContext;