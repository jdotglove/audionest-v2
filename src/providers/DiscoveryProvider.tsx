import React, { Fragment } from "react";

import axios from "../plugins/axios";
import { DiscoveryProviderState, DiscoveryProviderProps } from "../../types";
import { SpotifyCache } from "../cache";
import DiscoveryContext from "../contexts/DiscoveryContext";
import { authenticateSpotify } from "../middleware/spotify";

class DiscoveryProvider extends React.PureComponent<
  DiscoveryProviderProps,
  DiscoveryProviderState
> {
  constructor(props: DiscoveryProviderProps | Readonly<DiscoveryProviderProps>) {
    super(props);
    this.state = {
      newReleases: [],
      authorizationError: false,
      browsingCategories: {},
    };
  }
  fetchNewReleases = async (page?: number) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/discovery/new-releases?token=${accessToken}&page=${page}`,
        method: "get",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
      });
      this.setState({ newReleases: [...this.state.newReleases, ...response.data] });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        sessionStorage.removeItem("accessToken");
        authenticateSpotify();
      } else {
        console.error(
          "ERROR: Could not retrieve new releases.",
          error.response?.statusText || error.message
        );
      }
    }
  }

  fetchCategoryPlaylists = async (page: number, category: string) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/discovery/${category}/playlists?token=${accessToken}&page=${page}`,
        method: "get",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
      });
      //this.setState({ newReleases: [...this.state.newReleases, ...response.data] });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        sessionStorage.removeItem("accessToken");
        authenticateSpotify();
      } else {
        console.error(
          "ERROR: Could not retrieve category playlists.",
          error.response?.statusText || error.message
        );
      }
    }
  }

  fetchCategoryItem = async(categoryItemId: string, itemType: string) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      console.log("Type: ", itemType);
      console.log("Id: ", categoryItemId);
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/${itemType}/${categoryItemId}?token=${accessToken}`,
        method: "get",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        sessionStorage.removeItem("accessToken");
        authenticateSpotify();
      } else {
        console.error(
          "ERROR: Could not retrieve category item.",
          error.response?.statusText || error.message
        );
      }
    }
  }

  fetchCategoryItemTracks = async(categoryItemId: string, itemType: string) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/${itemType}/${categoryItemId}/tracks?token=${accessToken}`,
        method: "get",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
      })
    } catch (error: any) {
      if (error.response?.status === 401) {
        sessionStorage.removeItem("accessToken");
        authenticateSpotify();
      } else {
        console.error(
          "ERROR: Could not retrieve category item tracks.",
          error.response?.statusText || error.message
        );
      }
    }
  }

  fetchBrowsingCategories = async() => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/discovery/categories?token=${accessToken}`,
        method: "get",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
      });
      const discoveryMap = {
        "New Releases": (page: number) => this.fetchNewReleases(page),
      }
      await Promise.all(response.data.map((category: any) => {
        discoveryMap[category.name] = (page: number) => this.fetchCategoryPlaylists(page, category.id)
      }))
      this.setState({
        browsingCategories: {...discoveryMap},
      });
    } catch(error: any) {
      if (error.response?.status === 401) {
        sessionStorage.removeItem("accessToken");
        authenticateSpotify();
      } else {
        console.error(
          "ERROR: Could not retrieve browsing categories.",
          error.response?.statusText || error.message
        );
      }
    }
  }

  componentDidMount = async() => {
    await this.fetchBrowsingCategories();
  }

  render() {
    return (
      <DiscoveryContext.Provider
        value={{
          newReleases: this.state.newReleases,
          fetchNewReleases: (page: number) => this.fetchNewReleases(page),
          fetchCategoryItem: (categoryItemId: string, itemType: string) =>
            this.fetchCategoryItem(categoryItemId, itemType),
          fetchCategoryItemTracks: (categoryItemId: string, itemType: string) =>
            this.fetchCategoryItemTracks(categoryItemId, itemType),
          browsingCategories: this.state.browsingCategories,
        }}
      >
        <Fragment>{this.props.children}</Fragment>
      </DiscoveryContext.Provider>
    );
  }
}

export default DiscoveryProvider;
