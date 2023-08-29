import React, { Fragment } from "react";

import axios from "../plugins/axios";
import { ArtistProviderState, ArtistProviderProps } from "../../types";
import { SpotifyCache } from "../cache";
import ArtistContext from "../contexts/ArtistContext";

class ArtistProvider extends React.PureComponent<
  ArtistProviderProps,
  ArtistProviderState
> {
  constructor(props: ArtistProviderProps | Readonly<ArtistProviderProps>) {
    super(props);
    this.state = {
      artistId: props.artistId,
      albums: undefined,
      name: "",
      genres: [],
      popularity: 0,
      uri: "",
      tracks: [],
      authorizationError: false,
    };
  }

  async componentDidMount() {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/artist/${this.state.artistId}?token=${accessToken}`,
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
          "ERROR: Could not retrieve artist data.",
          error.response?.statusText || error.message
        );
      }
    }
  }

  render() {
    return (
      <ArtistContext.Provider
        value={{
          ...this.state,
        }}
      >
        <Fragment>{this.props.children}</Fragment>
      </ArtistContext.Provider>
    );
  }
}

export default ArtistProvider;
