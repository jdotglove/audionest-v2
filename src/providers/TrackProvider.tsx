import React, { Fragment } from "react";

import axios from "../plugins/axios";
import { TrackProviderState, TrackProviderProps } from "../../types";
import { SpotifyCache } from "../cache";
import TrackContext from "../contexts/TrackContext";
import { authenticateSpotify } from "../middleware/spotify";

class TrackProvider extends React.Component<
  TrackProviderProps,
  TrackProviderState
> {
  constructor(props: TrackProviderProps | Readonly<TrackProviderProps>) {
    super(props);
    this.state = {
      album: undefined,
      artists: [],
      audioFeatures: {
        acousticness: 0,
        analysisUrl: "",
        danceability: 0,
        energy: 0,
        instrumentalness: 0,
        key: 0,
        liveness: 0,
        loudness: 0,
        mode: 0,
        speechiness: 0,
        uri: "",
        tempo: 0,
        timeSignature: 0,
        valence: 0,
      },
      authorizationError: false,
      availableMarkets: [],
      durationMs: 0,
      explicit: false,
      name: "",
      popularity: 0,
      uri: "",
      trackNumber: 0,
      trackId: props.trackId,
    };
  }

  async componentDidMount() {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/track/${this.state.trackId}?token=${accessToken}`,
        method: "get",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
      });
      this.setState({ ...response.data });
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.setState({
          authorizationError: true,
        });
      } else {
        console.error(
          "Error retreiving track data: ",
          error.response?.statusText || error.message
        );
      }
    }
  }

  getTrackArtist = async (artistId: string) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/artist/${artistId}?token=${accessToken}`,
        method: "get",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
      });
      if (!response.data) {
        return "No Artist";
      }
      return (response.data as Audionest.Artist)?.name;
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.setState({
          authorizationError: true,
        });
      } else {
        console.error(
          "ERROR: Could not retrieve track's artists.",
          error.response?.statusText || error.message
        );
      }
    }
  };

  render() {
    return (
      <TrackContext.Provider
        value={{
          ...this.state,
          getTrackArtist: (artistId: string) => this.getTrackArtist(artistId),
        }}
      >
        <Fragment>{this.props.children}</Fragment>
      </TrackContext.Provider>
    );
  }
}

export default TrackProvider;
