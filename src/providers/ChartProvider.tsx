import React, { Fragment } from "react";
import { ChartProviderState, ChartProviderProps } from "../../types";
import ChartContext from "../contexts/ChartContext";
import { SpotifyCache, TrackStatisticsCache } from "../cache";
import axios from "../plugins/axios";

class ChartProvider extends React.PureComponent<
  ChartProviderProps,
  ChartProviderState
> {
  constructor(props: ChartProviderProps | Readonly<ChartProviderProps>) {
    super(props);
    this.state = {
      chartData: null,
      authorizationError: false,
    };
  }

  getTrackAudioFeatures = async (trackSpotifyId: string) => {
    const cacheValue = TrackStatisticsCache.get(trackSpotifyId);
    if (cacheValue !== -1) {
      return cacheValue;
    }
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/track/${trackSpotifyId}/audio-features?token=${accessToken}`,
        method: "get",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
      });
      TrackStatisticsCache.set(trackSpotifyId, response.data);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.setState({
          authorizationError: true,
        });
      } else {
        console.error(
          "ERROR: Could not retrieve audio features.",
          error.response?.statusText || error.message
        );
      }
    }
  };

  cleanTrackFeaturesData = ({
    danceability,
    energy,
    speechiness,
    acousticness,
    liveness,
    valence,
  }: SpotifyApi.AudioFeaturesObject) => ({
    danceability,
    energy,
    speechiness,
    acousticness,
    liveness,
    valence,
  });

  formatAsChartData = (tracksData: any[]) => ({
    labels: Object.keys(tracksData[0]),
    datasets: tracksData.map((trackData) => ({
      data: Object.values(trackData).map((datum: number) => datum * 100),
      backgroundColor: "rgba(13, 202, 240, 0.2)",
      borderColor: "#0dcaf0",
      borderWidth: 2,
    })),
  });

  setChartData = async (trackIdsArray: Array<any>) => {
    try {
      // Get a track's audio analysis
      const data = await Promise.all(
        trackIdsArray.map(async (trackId) => {
          return this.cleanTrackFeaturesData(
            await this.getTrackAudioFeatures(trackId)
          );
        })
      );
      const averages = data.reduce(
        (acc, datum) => {
          Object.keys(datum).forEach((key) => {
            acc[key] += datum[key] / data.length;
          });
          return acc;
        },
        {
          danceability: 0,
          energy: 0,
          speechiness: 0,
          acousticness: 0,
          liveness: 0,
          valence: 0,
        }
      );
      this.setState({
        chartData: this.formatAsChartData([averages]),
      });
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.setState({
          authorizationError: true,
        });
      } else {
        console.error(
          "ERROR: Could not set chart data.",
          error.response?.statusText || error.message
        );
      }
    }
  };

  render() {
    return (
      <ChartContext.Provider
        value={{
          setChartData: (trackRecords: Array<string>) =>
            this.setChartData(trackRecords),
          chartData: this.state.chartData,
        }}
      >
        <Fragment>{this.props.children}</Fragment>
      </ChartContext.Provider>
    );
  }
}

export default ChartProvider;
