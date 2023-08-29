declare module Audionest {
    interface SpotifyModel {
      id: string;
      uri: string
    };
    export interface Artist extends SpotifyModel {
      genres: Array<string>;
      name: string;
      popularity: number;
    };
    export interface Album extends SpotifyModel {
      albumType: string;
      artists: Array<any>;
      availableMarkets: Array<string>;
      name: string;
      releaseDate: string;
      releaseDatePercision: string;
      totalTracks: number;
    };
    export interface Playlist extends SpotifyModel {
      name: string;
      owner: any;
      tracks: Array<any>;
    };
    export interface Recommendation extends SpotifyModel {
      seeds: Array<any>;
      tracks: Array<Track>;
    }
    export interface Track extends SpotifyModel {
      album: any;
      artists: Array<any>;
      availableMarkets: Array<string>;
      audioFeatures: {
        acousticness: number;
        analysisUrl: string;
        danceability: number;
        energy: number;
        instrumentalness: number;
        key: number;
        liveness: number;
        loudness: number;
        mode: number;
        speechiness: number;
        tempo: number;
        timeSignature: number;
        valence: number;
      };
      explicit: boolean;
      genre?: string;
      name: string;
      popularity: number;
      trackNumber: number;
    };
    export interface User extends SpotifyModel {
      country: string;
      display_name: string;
      email: string;
      images: Array<any>
      playlists: Array<any>;
      topArtists: Array<any>;
      topTracks: Array<any>;
    };
  }