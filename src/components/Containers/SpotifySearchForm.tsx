import React from "react";
import NextImage from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import placeholderImg from "../../../public/placeholder.png";
import RecommendationContext from "../../contexts/RecommendationContext";
import SpotifyContext from "../../contexts/SpotifyContext";

export default function SpotifySearchForm({
  handleSearch,
  searchType,
  searchInputRef,
}) {
  function handleKeyPress(e: { nativeEvent: { code: string; keyCode: number; }; }) {
    if (e.nativeEvent.code === "Enter" || e.nativeEvent.keyCode === 13) {
      handleSearch();
    }
  }

  return (
    <RecommendationContext.Consumer>
      {({
        addSeedArtist,
        addSeedTrack,
        showSeedAlert,
        seedAddResult,
        dismissAddSeedAlert,
      }) => (
        <div className="bg-[#2D3748] rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-bold mb-2">Seed {searchType}</h2>
          <div className="flex items-center mb-3">
            <span className="bg-[#37474F] rounded-l-md p-2">
              <SearchIcon />
            </span>
            <input
              type="text"
              ref={searchInputRef}
              aria-label={`Search ${searchType}`}
              className="flex-grow bg-[#37474F] text-[#F2E8CF] rounded-r-md p-2 focus:outline-none"
              onKeyUp={handleKeyPress}
            />
            <button
              type="button"
              className="bg-[#0097A7] text-[#2D3748] px-2 py-2 rounded hover:bg-[#0aabb0] transition"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          {showSeedAlert && (
            <div
              className={`bg-${
                seedAddResult === "success" ? "green-500" : "red-500"
              } p-2 rounded mb-3`}
            >
              {seedAddResult === "success"
                ? `Added ${searchType} Seed!`
                : `Error Adding ${searchType} Seed`}
              {/* <button
                onClick={dismissAddSeedAlert}
                className="ml-2 text-white underline"
              >
                 &times;
              </button> */}
            </div>
          )}
          <h5 className="font-semibold mb-2">Search Results:</h5>
          <div className="overflow-y-auto h-[60dvh]">
            <SpotifyContext.Consumer>
              {({ artistSearchResults, trackSearchResults }) => (
                <ul className="space-y-2">
                  {searchType === "Artists"
                    ? artistSearchResults.map((artist) => (
                        <li
                          key={artist.id}
                          onClick={() => addSeedArtist(artist)}
                          className="flex items-center justify-between bg-[#37474F] p-2 rounded cursor-pointer hover:bg-[#0097A7] transition"
                        >
                          {artist.images[0] ? (
                            <img
                              src={artist.images[0]?.url}
                              height={55}
                              width={55}
                              className="rounded-full"
                              alt={`Artist Profile Picture`}
                            />
                          ) : (
                            <img
                              src={placeholderImg.src}
                              height={55}
                              width={55}
                              alt={`Default Artist Profile Picture`}
                            />
                          )}
                          <span className="px-2">{artist.name}</span>
                          <AddIcon />
                        </li>
                      ))
                    : trackSearchResults.map((track) => (
                        <li
                          key={track.id}
                          onClick={() => addSeedTrack(track)}
                          className="flex items-center justify-between bg-[#37474F] p-2 rounded cursor-pointer hover:bg-[#0097A7] transition"
                        >
                          {track.album.images[0] ? (
                            <img
                              src={track.album.images[0]?.url}
                              height={55}
                              width={55}
                              className="rounded-full"
                              alt="Track Album Picture"
                            />
                          ) : (
                            <img
                              src={placeholderImg.src}
                              height={55}
                              width={55}
                              alt="Default Album Profile Picture"
                            />
                          )}
                          <span className="px-2">
                            {track.name} - {track.artists[0].name}
                          </span>
                          <AddIcon />
                        </li>
                      ))}
                </ul>
              )}
            </SpotifyContext.Consumer>
          </div>
        </div>
      )}
    </RecommendationContext.Consumer>
  );
}
