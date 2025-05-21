import React, { Fragment, useState, useRef, useContext } from "react";
import SpotifySearchForm from "../Containers/SpotifySearchForm";
import RecommendationContext from "../../contexts/RecommendationContext";
import SpotifyContext from "../../contexts/SpotifyContext";

export default function RecommendationSeedSearch() {
  const [searchTarget, setSeedTarget] = useState("Artists");
  const trackSearchSelected = useRef(null);
  const artistSearchSelected = useRef(null);
  const spotifyContext = useContext(SpotifyContext);
  const searchArtistInput = useRef(null);
  const searchTrackInput = useRef(null);

  const onOptionChange = (e) => {
    setSeedTarget(e.target.value);
    if (searchTarget === "Artists") {
      searchArtistInput.current.value = "";
    } else {
      searchTrackInput.current.value = "";
    }
  };

  const handleSearchArtists = async (searchQuery: string) => {
    if (searchQuery !== "") {
      spotifyContext.searchItems("artist", searchQuery);
    }
  };

  const handleSearchTracks = async (searchQuery: string) => {
    if (searchQuery !== "") {
      spotifyContext.searchItems("track", searchQuery);
    }
  };

  return (
    <Fragment>
      <RecommendationContext.Consumer>
        {({ toggleShowSeedSearch, showSeedSearch }) => (
          <Fragment>
            {showSeedSearch && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
                <div className="fixed lg:w-[30dvw] inset-0 bg-surface text-text z-50 px-4 py-2">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Playlist Seed Search</h2>
                    <button
                      onClick={() => toggleShowSeedSearch(false)}
                      className="text-4xl hover:text-text-secondary transition"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="flex mb-4 text-xl">
                    <div className="flex items-center mr-4">
                      <input
                        type="radio"
                        id="artist-search"
                        name="seed_search_selection"
                        checked={searchTarget === "Artists"}
                        value="Artists"
                        ref={artistSearchSelected}
                        onChange={onOptionChange}
                        className="mr-2 accent-primary"
                      />
                      <label htmlFor="artist-search" className="text-text">Artists</label>
                    </div>
                    <div className="flex items-center text-xl">
                      <input
                        type="radio"
                        id="track-search"
                        name="seed_search_selection"
                        checked={searchTarget === "Tracks"}
                        value="Tracks"
                        ref={trackSearchSelected}
                        onChange={onOptionChange}
                        className="mr-2 accent-primary"
                      />
                      <label htmlFor="track-search" className="text-text">Tracks</label>
                    </div>
                  </div>
                  <div className="pt-3 text-xl">
                    {searchTarget === "Artists" ? (
                      <SpotifySearchForm
                        handleSearch={handleSearchArtists}
                        searchType="Artists"
                        searchInputRef={searchArtistInput}
                      />
                    ) : (
                      <SpotifySearchForm
                        handleSearch={handleSearchTracks}
                        searchType="Tracks"
                        searchInputRef={searchTrackInput}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        )}
      </RecommendationContext.Consumer>
    </Fragment>
  );
}
