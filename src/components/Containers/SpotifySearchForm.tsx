import React, { Fragment } from "react";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import placeholderImg from "../../../public/placeholder.png";
import RecommendationContext from "../../contexts/RecommendationContext";
import SpotifyContext from "../../contexts/SpotifyContext";

export default function SpotifySearchForm({
  handleSearch,
  searchType,
  searchInputRef,
}) {
  function handleKeyPress(e: { nativeEvent: { code: string; keyCode: number } }) {
    if (e.nativeEvent.code === "Enter" || e.nativeEvent.keyCode === 13) {
      handleSearch(searchInputRef.current.value);
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
        <div className="bg-surface rounded-lg shadow-lg p-4">
          <div className="relative flex gap-2 mb-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="text-text-secondary" />
              </div>
              <input
                type="text"
                ref={searchInputRef}
                placeholder={`Search ${searchType}...`}
                onKeyPress={handleKeyPress}
                className="w-full bg-background text-text pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>
            <button
              onClick={() => handleSearch(searchInputRef.current.value)}
              className="bg-primary text-text py-2 px-6 rounded-lg hover:bg-primary-dark active:bg-primary-darker transition flex items-center gap-2"
            >
              <SearchIcon className="text-sm" />
              Search
            </button>
          </div>

          {showSeedAlert && (
            <div
              className={`p-3 rounded-lg mb-4 flex items-center justify-between ${
                seedAddResult === "success"
                  ? "bg-success/10 text-success border border-success"
                  : "bg-error/10 text-error border border-error"
              }`}
            >
              <span>
                {seedAddResult === "success"
                  ? `Added ${searchType} Seed!`
                  : `Error Adding ${searchType} Seed`}
              </span>
              <button
                onClick={dismissAddSeedAlert}
                className="hover:text-text-secondary transition"
              >
                &times;
              </button>
            </div>
          )}

          <div className="mb-4">
            <h5 className="font-semibold text-text flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-primary"></span>
              Search Results
            </h5>
          </div>

          <div className="overflow-y-auto h-[60dvh] pr-2">
            <SpotifyContext.Consumer>
              {({ artistSearchResults, trackSearchResults }) => (
                <ul className="space-y-2">
                  {searchType === "Artists" &&
                    artistSearchResults.map((artist) => (
                      <li
                        key={artist.id}
                        onClick={() => addSeedArtist(artist)}
                        className="group flex items-center justify-between bg-background text-text p-3 rounded-lg cursor-pointer hover:bg-surface border border-transparent hover:border-border transition"
                      >
                        <div className="flex items-center gap-3">
                          {artist.images[0] ? (
                            <img
                              src={artist.images[0]?.url}
                              height={48}
                              width={48}
                              className="rounded-full"
                              alt="Artist Profile Picture"
                            />
                          ) : (
                            <img
                              src={placeholderImg.src}
                              height={48}
                              width={48}
                              className="rounded-full opacity-50"
                              alt="Default Artist Profile Picture"
                            />
                          )}
                          <span className="font-medium group-hover:text-primary transition">
                            {artist.name}
                          </span>
                        </div>
                        <AddIcon className="text-primary opacity-0 group-hover:opacity-100 transition" />
                      </li>
                    ))}
                  {searchType === "Tracks" &&
                    trackSearchResults.map((track) => (
                      <li
                        key={track.id}
                        onClick={() => addSeedTrack(track)}
                        className="group flex items-center justify-between bg-background text-text p-3 rounded-lg cursor-pointer hover:bg-surface border border-transparent hover:border-border transition"
                      >
                        <div className="flex items-center gap-3">
                          {track.album.images[0] ? (
                            <img
                              src={track.album.images[0]?.url}
                              height={48}
                              width={48}
                              className="rounded-full"
                              alt="Track Album Picture"
                            />
                          ) : (
                            <img
                              src={placeholderImg.src}
                              height={48}
                              width={48}
                              className="rounded-full opacity-50"
                              alt="Default Album Profile Picture"
                            />
                          )}
                          <div className="flex flex-col">
                            <span className="font-medium group-hover:text-primary transition">
                              {track.name}
                            </span>
                            <span className="text-sm text-text-secondary">
                              {track.artists[0].name}
                            </span>
                          </div>
                        </div>
                        <AddIcon className="text-primary opacity-0 group-hover:opacity-100 transition" />
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
