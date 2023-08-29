import axios from "../plugins/axios";
import React, { Fragment } from "react";

import { getURLHash } from "../utils/spotify";
import { SpotifyProviderProps, SpotifyProviderState } from "../../types";
import SpotifyContext from "../contexts/SpotifyContext";
import { authenticateSpotify } from "../middleware/spotify";
import { SpotifyCache } from "../cache";
// credentials are optional

class SpotifyProvider extends React.PureComponent<
  SpotifyProviderProps,
  SpotifyProviderState
> {
  constructor(props: SpotifyProviderProps | Readonly<SpotifyProviderProps>) {
    super(props);
    this.state = {
      artistSearchResults: [],
      authorizationError: false,
      currentSelectedPlaylist: null,
      currentSelectedTracks: [],
      genreSeeds: null,
      isLoggedIn: false,
      playlists: [],
      user: null,
      seenInfoModal: false,
      token: "",
      topTracks: [],
      topArtists: [],
      trackSearchResults: [],
    };
  }

  async componentDidMount() {
    let accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      accessToken = (await getURLHash() as { access_token: string }).access_token;
    }
    if (accessToken && !this.state.isLoggedIn) {
      await this.login(accessToken);
    }
    window.location.hash = ""
    sessionStorage.setItem("accessToken", accessToken);
  }

  login = async (accessToken: string) => {
    try {
      const fetchUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/login?token=${accessToken}`;
      const response = await axios({
        url: fetchUrl,
        method: "post",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          username: "",
          password: "",
        }),
      });
      await this.loadUserTopArtists(response.data.id, accessToken);
      await this.loadUserTopTracks(response.data.id, accessToken);
      await this.loadUserPlaylists(response.data.id, accessToken);
      this.setState({
        user: { ...response.data },
        isLoggedIn: true,
        token: accessToken,
      });
    } catch (error: any) {
      if (error.response?.status === 401) {
        sessionStorage.removeItem("accessToken");
        await authenticateSpotify();
      } else {
        console.error(
          "ERROR: Could not login user.",
          error.response?.statusText || error.message
        );
      }
    }
  };

  loadUserTopArtists = async (userSpotifyId: string, token?: string) => {
    try {
      const accessToken = token ?? sessionStorage.getItem("accessToken");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${userSpotifyId}/top-artists?token=${accessToken}`,
        method: "get",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
      });
      this.setState({
        topArtists: [
          ...(response?.data.map((artist: Audionest.Artist) => artist.id) ||
            []),
        ],
      });
    } catch (error: any) {
      if (error.response?.status === 401) {
        sessionStorage.removeItem("accessToken");
        await authenticateSpotify();
      } else {
        console.error(
          "ERROR: Could not retrieve user playlists.",
          error.response?.statusText || error.message
        );
      }
    }
  };

  loadUserTopTracks = async (userSpotifyId: string, token?: string) => {
    try {
      const accessToken = token ?? sessionStorage.getItem("accessToken");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${userSpotifyId}/top-tracks?token=${accessToken}`,
        method: "get",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
      });
      this.setState({
        topTracks: [
          ...(response?.data.map((track: Audionest.Track) => track.id) || []),
        ],
      });
    } catch (error: any) {
      if (error.response?.status === 401) {
        sessionStorage.removeItem("accessToken");
        await authenticateSpotify();
      } else {
        console.error(
          "ERROR: Could not retrieve user playlists.",
          error.response?.statusText || error.message
        );
      }
    }
  };

  loadUserPlaylists = async (userSpotifyId: string, token?: string) => {
    try {
      const accessToken = token ?? sessionStorage.getItem("accessToken");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${userSpotifyId}/playlists?token=${accessToken}`,
        method: "get",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
      });
      this.setState({ playlists: [...(response?.data || [])] });
    } catch (error: any) {
      if (error.response?.status === 401) {
        sessionStorage.removeItem("accessToken");
        await authenticateSpotify();
      } else {
        console.error(
          "ERROR: Could not retrieve user playlists.",
          error.response?.statusText || error.message
        );
      }
    }
  };

  searchItems = async (searchType: string, searchValue: string) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/${searchType}/search?token=${accessToken}`,
        method: "post",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          type: searchType,
          query: searchValue,
        }),
      });
      if (searchType === "artist") {
        this.setState({
          artistSearchResults: [...(response.data as Array<any>)],
        });
      } else if (searchType === "track") {
        this.setState({
          trackSearchResults: [...(response.data as Array<any>)],
        });
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        sessionStorage.removeItem("accessToken");
        await authenticateSpotify();
      } else {
        console.error(
          "ERROR: could not search spotify item.",
          error.response?.statusText || error.message
        );
      }
    }
  };

  setSelectedPlaylist = async (playlistData: any) => {
    this.setState({ currentSelectedPlaylist: playlistData });
  };

  setSelectedTracks = async (trackIdArray: Array<any>) => {
    try {
      
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios({
        url: `${
          process.env.NEXT_PUBLIC_BASE_API_URL
        }/track?token=${accessToken}&ids=${trackIdArray.join(",")}`,
        method: "get",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
      });
      this.setState({
        currentSelectedTracks: response.data,
      });
    } catch (error: any) {
      if (error.response?.status === 401) {
        sessionStorage.removeItem("accessToken");
        await authenticateSpotify();
      } else {
        console.error(
          "Error setting selected tracks: ",
          error.response?.statusText || error.message
        );
      }
    }
  };
  checkIfSeenInfoModal = () => {
    const infoModalSeen = sessionStorage.getItem("seenInfoModal");
    if (infoModalSeen === "true") {
      return true;
    }
    return this.state.seenInfoModal;
  };

  acknowledgeInfoModal = () => {
    sessionStorage.setItem("seenInfoModal", "true");
    this.setState({
      seenInfoModal: true,
    });
  };

  render() {
    return (
      <SpotifyContext.Provider
        value={{
          artistSearchResults: this.state.artistSearchResults,
          acknowledgeInfoModal: () => this.acknowledgeInfoModal(),
          checkIfSeenInfoModal: () => this.checkIfSeenInfoModal(),
          currentSelectedPlaylist: this.state.currentSelectedPlaylist,
          currentSelectedTracks: this.state.currentSelectedTracks,
          isLoggedIn: this.state.isLoggedIn,
          login: this.login,
          playlists: this.state.playlists,
          searchItems: this.searchItems,
          setSelectedPlaylist: this.setSelectedPlaylist,
          // setSelectedTracks: this.setSelectedTracks,
          trackSearchResults: this.state.trackSearchResults,
          topArtists: this.state.topArtists,
          topTracks: this.state.topTracks,
          user: this.state.user,
        }}
      >
        <Fragment>{this.props.children}</Fragment>
      </SpotifyContext.Provider>
    );
  }
}

export default SpotifyProvider;
