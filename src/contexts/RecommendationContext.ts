
import { createContext } from 'react';

const RecommendationContext = createContext({
  addToQueue: undefined,
  addSeedArtist: undefined,
  addSeedTrack: undefined,
  atLeastOneSeedSelected: undefined,
  dismissAddToQueueAlert: undefined,
  dismissAddSeedAlert: undefined,
  clearSelectedSeeds: undefined,
  currentTrackBreakdown: undefined,
  generateRecommendations: undefined,
  seedCurrentVibes: undefined,
  handleGenreInputChange: undefined,
  listOfSeedGenres: [] as Array<string>,
  recommendedTrackList: [] as Array<any>, // TODO: come back to typing
  retrieveCurrentTrackBreakdown: undefined,
  showQueueAlert: undefined,
  showSeedAlert: undefined,
  queueAddResult: undefined,
  seedAddResult: undefined,
  selectedSeedArtists: [] as Array<any>,
  selectedSeedGenres: [] as Array<string>,
  selectedSeedTracks: [] as Array<any>,
  showSeedSearch: undefined,
  targetAudioFeaturesMap: undefined,
  toggleShowSeedSearch: undefined,
  noVibesAlert: undefined,
});

export default RecommendationContext;