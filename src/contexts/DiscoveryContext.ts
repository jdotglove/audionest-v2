import { createContext } from 'react';

const DiscoveryContext = createContext({
  browsingCategories: undefined,
  newReleases: undefined,
  fetchNewReleases: undefined,
  fetchCategoryItem: undefined,
  fetchCategoryItemTracks: undefined,
});

export default DiscoveryContext;