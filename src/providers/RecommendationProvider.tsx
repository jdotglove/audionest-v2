import React, { Fragment } from "react";

import axios from "../plugins/axios";
import {
  RecommendationProviderState,
  RecommendationProviderProps,
} from "../../types";
import { SpotifyCache } from "../cache";
import RecommendationContext from "../contexts/RecommendationContext";
import { authenticateSpotify } from "../middleware/spotify";

const recommendationsConfigConstants = {
  limit: 10,
  min_acousticness: 0, // range 0 - 1
  max_acousticness: 1,
  min_danceability: 0,
  max_danceability: 1,
  // min_duration_ms: ,
  // max_duration_ms: ,
  // target_duration_ms: ,
  min_energy: 0,
  max_energy: 1,
  min_instrumentalness: 0,
  max_instrumentalness: 1,
  min_key: 0,
  max_key: 11,
  min_liveness: 0,
  max_liveness: 1,
  // min_loudness: 0,
  // max_loudness: 1,
  min_mode: 0,
  max_mode: 1,
  min_popularity: 30, // TODO: comeback and play with this floor
  max_popularity: 100,
  min_speechiness: 0,
  max_speechiness: 1,
  // min_tempo: 0,
  // max_tempo: 1,
  // min_time_signature: 0,
  // max_time_signature: 1,
  min_valence: 0,
  max_valence: 1,
};

class RecommendationProvider extends React.PureComponent<
  RecommendationProviderProps,
  RecommendationProviderState
> {
  constructor(
    props: RecommendationProviderProps | Readonly<RecommendationProviderProps>
  ) {
    super(props);
    this.state = {
      currentTrackBreakdown: undefined,
      listOfSeedGenres: [],
      recommendedTrackList: [],
      showQueueAlert: false,
      showSeedAlert: false,
      queueAddResult: undefined,
      seedAddResult: undefined,
      selectedSeedArtists: [],
      selectedSeedGenres: [],
      selectedSeedTracks: [],
      showSeedSearch: false,
      targetAudioFeaturesMap: undefined,
      authorizationError: false,
      noVibesAlert: false,
    };
  }

  generateRecommendations = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      let targetFeaturePayload = {};
      if (this.state.targetAudioFeaturesMap) {
        Object.keys(this.state.targetAudioFeaturesMap).forEach(
          (featureLabel) => {
            targetFeaturePayload[`target_${featureLabel}`] =
              this.state.targetAudioFeaturesMap[featureLabel];
          }
        );
      }
      const recommendationPayload = {
        ...recommendationsConfigConstants,
        ...targetFeaturePayload,
        seed_artists: this.state.selectedSeedArtists.map(
          (artistObj) => artistObj.id
        ),
        seed_genres: this.state.selectedSeedGenres,
        seed_tracks: this.state.selectedSeedTracks.map(
          (trackObj) => trackObj.id
        ),
      };
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/recommendations?token=${accessToken}`,
        method: "post",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
        data: JSON.stringify(recommendationPayload),
      });
      this.setState({ recommendedTrackList: [...response.data] });
    } catch (error: any) {
      if (error.response?.status === 401) {
        sessionStorage.removeItem("accessToken");
        await authenticateSpotify();
      } else {
        console.error(
          "ERROR: Could not retrieve recommendation",
          error.response?.statusText || error.message
        );
      }
    }
  };
  getListOfSeedGenres = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/recommendations/seed-genres?token=${accessToken}`,
        method: "get",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
      });
      this.setState({ listOfSeedGenres: [...(response?.data || [])] });
    } catch (error: any) {
      if (error.response?.status === 401) {
        sessionStorage.removeItem("accessToken");
        await authenticateSpotify();
      } else {
        console.error(
          "ERROR: Could not retrieve recommendation",
          error.response?.statusText || error.message
        );
      }
    }
  };

  handleGenreInputChange = (genre: string, checkboxObj: any) => {
    if (checkboxObj.checked) {
      if (this.maxSeedCapacityReached()) {
        return;
      }
      this.setState({
        selectedSeedGenres: [...this.state.selectedSeedGenres, genre],
      });
    } else {
      this.setState({
        selectedSeedGenres: [
          ...this.state.selectedSeedGenres.filter(
            (selectedGenre) => selectedGenre !== genre
          ),
        ],
      });
    }
  };

  addSeedArtist = (artistPayload: any) => {
    if (
      !this.maxSeedCapacityReached() &&
      !this.state.selectedSeedArtists.find(
        (selectedArtist) => selectedArtist.id === artistPayload.id
      )
    ) {
      this.setState({
        selectedSeedArtists: [
          ...this.state.selectedSeedArtists,
          { id: artistPayload.id, name: artistPayload.name },
        ],
      });
      this.setState({
        showSeedAlert: true,
        seedAddResult: "success",
      });
    } else {
      this.setState({
        showSeedAlert: true,
        seedAddResult: "danger",
      });
    }
  };

  maxSeedCapacityReached = () => {
    return (
      this.state.selectedSeedArtists.length +
        this.state.selectedSeedGenres.length +
        this.state.selectedSeedTracks.length >=
      5
    );
  };

  addSeedTrack = (trackPayload: any) => {
    if (
      !this.maxSeedCapacityReached() &&
      !this.state.selectedSeedTracks.find(
        (selectedTrack) => selectedTrack.id === trackPayload.id
      )
    ) {
      this.setState({
        selectedSeedTracks: [
          ...this.state.selectedSeedTracks,
          { id: trackPayload.id, name: trackPayload.name },
        ],
      });
      this.setState({
        showSeedAlert: true,
        seedAddResult: "success",
      });
    } else {
      this.setState({
        showSeedAlert: true,
        seedAddResult: "danger",
      });
    }
  };

  atLeastOneSeedSelected = () => {
    return (
      this.state.selectedSeedArtists.length +
        this.state.selectedSeedTracks.length >=
      1
    );
  };

  clearSelectedSeeds = () => {
    this.setState({
      selectedSeedArtists: [],
      selectedSeedTracks: [],
      targetAudioFeaturesMap: {},
    });
  };

  retrieveCurrentTrackBreakdown = async (userSpotifyId: string) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${userSpotifyId}/playback-state?token=${accessToken}`,
        method: "get",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
      });
      this.setState({
        currentTrackBreakdown: { ...response.data },
        noVibesAlert: false,
      });
    } catch (error: any) {
      if (error.response?.status === 401) {
        sessionStorage.removeItem("accessToken");
        await authenticateSpotify();
      } else if (error.response?.status === 404) {
        this.setState({
          noVibesAlert: true,
        });
      } else {
        console.error(
          "ERROR: Could not retrieve playback state",
          error.response?.statusText || error.message
        );
      }
    }
  };

  seedCurrentVibes = async (currentTrack: any, chartData: any) => {
    try {
      this.addSeedTrack(currentTrack);
      let audioFeatureMap = {};
      chartData.labels.forEach((label, idx) => {
        audioFeatureMap[label] = chartData.datasets[0].data[idx];
      });
      this.setState({
        targetAudioFeaturesMap: { ...audioFeatureMap },
      });
    } catch (error: any) {
      if (error.response.status === 401) {
        sessionStorage.removeItem("accessToken");
        await authenticateSpotify();
      } else {
        console.error(
          "Error generating similar vibes: ",
          error.response?.statusText || error.message
        );
      }
    }
  };

  addToQueue = async (userSpotifyId: string, track: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${userSpotifyId}/queue?token=${accessToken}`,
        method: "post",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          trackUri: track.uri,
        }),
      });
      this.setState({
        showQueueAlert: true,
        queueAddResult: "success",
      });
    } catch (error: any) {
      if (error.response?.status === 401) {
        sessionStorage.removeItem("accessToken");
        await authenticateSpotify();
      } else {
        console.error(
          "ERROR: Could not add track to queue",
          error.response?.statusText || error.message
        );
        this.setState({
          showQueueAlert: true,
          queueAddResult: "danger",
        });
      }
    }
  };

  dismissAddToQueueAlert = () => {
    this.setState({
      showQueueAlert: false,
    });
  };

  dismissAddSeedAlert = () => {
    this.setState({
      showSeedAlert: false,
    });
  };

  toggleShowSeedSearch = (newDisplayValue: boolean) => {
    this.setState({
      showSeedSearch: newDisplayValue,
    });
  };
  render() {
    return (
      <RecommendationContext.Provider
        value={{
          addToQueue: (userSpotifyId: string, track: any) =>
            this.addToQueue(userSpotifyId, track),
          addSeedArtist: (artistPayload: any) =>
            this.addSeedArtist(artistPayload),
          addSeedTrack: (trackPayload: any) => this.addSeedTrack(trackPayload),
          atLeastOneSeedSelected: () => this.atLeastOneSeedSelected(),
          dismissAddToQueueAlert: () => this.dismissAddToQueueAlert(),
          dismissAddSeedAlert: () => this.dismissAddSeedAlert(),
          clearSelectedSeeds: () => this.clearSelectedSeeds(),
          currentTrackBreakdown: this.state.currentTrackBreakdown,
          generateRecommendations: () => this.generateRecommendations(),
          seedCurrentVibes: (currentTrack: any, chartData: any) =>
            this.seedCurrentVibes(currentTrack, chartData),
          handleGenreInputChange: (genre: string, checkboxObj: any) =>
            this.handleGenreInputChange(genre, checkboxObj),
          listOfSeedGenres: this.state.listOfSeedGenres,
          queueAddResult: this.state.queueAddResult,
          seedAddResult: this.state.seedAddResult,
          recommendedTrackList: this.state.recommendedTrackList,
          retrieveCurrentTrackBreakdown: (userSpotifyId: string) =>
            this.retrieveCurrentTrackBreakdown(userSpotifyId),
          showQueueAlert: this.state.showQueueAlert,
          showSeedAlert: this.state.showSeedAlert,
          showSeedSearch: this.state.showSeedSearch,
          selectedSeedArtists: this.state.selectedSeedArtists,
          selectedSeedGenres: this.state.selectedSeedGenres,
          selectedSeedTracks: this.state.selectedSeedTracks,
          targetAudioFeaturesMap: this.state.targetAudioFeaturesMap,
          toggleShowSeedSearch: (newDisplayValue: boolean) =>
            this.toggleShowSeedSearch(newDisplayValue),
          noVibesAlert: this.state.noVibesAlert,
        }}
      >
        <Fragment>{this.props.children}</Fragment>
      </RecommendationContext.Provider>
    );
  }
}

export default RecommendationProvider;
