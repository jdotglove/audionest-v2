import React, { Fragment, useState, useRef, useContext } from "react";
import NextImage from "next/image";
import placeholderImg from "../../../public/placeholder.png";
import PlaylistContext from "../../contexts/PlaylistContext";

export default function RecommendationSelection({ user }) {
  const playlistTitleInput = useRef(null);
  const playlistDescriptionInput = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { savePlaylist, toggleShowPlaylistBuilder, clearPlaylistBuilder } =
    useContext(PlaylistContext);

  const handleCloseModal = () => setModalOpen(false);
  const handleOpenModal = () => setModalOpen(true);

  const handleSave = () => {
    const title = playlistTitleInput.current.value;
    const description = playlistDescriptionInput.current.value;
    savePlaylist(user.spotifyId, title, description);
    handleCloseModal();
    toggleShowPlaylistBuilder(false);
    clearPlaylistBuilder();
  };

  return (
    <Fragment>
      <PlaylistContext.Consumer>
        {({
          toggleShowPlaylistBuilder,
          showPlaylistBuilder,
          selectedTracks,
          removeFromPlaylistBuilder,
        }) => (
          <Fragment>
            {/* Modal for Playlist Details */}
            {modalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                <div className="bg-surface text-text rounded-lg shadow-lg p-6 w-96">
                  <h2 className="text-xl font-bold mb-4">
                    Set Playlist Details
                  </h2>
                  <div className="mb-4">
                    <label className="block mb-1">Playlist Title:</label>
                    <input
                      type="text"
                      ref={playlistTitleInput}
                      aria-label="Playlist Title"
                      className="w-full bg-background text-text p-2 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Playlist Description:</label>
                    <textarea
                      maxLength={150}
                      ref={playlistDescriptionInput}
                      aria-label="Playlist Description"
                      className="w-full bg-background text-text p-2 rounded"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      className="bg-primary-dark text-text py-2 px-4 rounded hover:bg-primary"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                    <button
                      className="bg-primary text-text py-2 px-4 rounded hover:bg-primary-dark"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Offcanvas for Playlist Builder */}
            {showPlaylistBuilder && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
                <div className="fixed lg:w-[30dvw] inset-0 lg:right-0 lg:top-0 lg:h-full bg-surface text-text z-50 px-4 py-2">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">Playlist Builder</h2>
                  {selectedTracks.length > 0 && (
                    <button
                      className="bg-secondary text-text py-1 px-2 rounded hover:bg-secondary-dark"
                      onClick={handleOpenModal}
                    >
                      Save Playlist
                    </button>
                  )}
                  <button onClick={() => toggleShowPlaylistBuilder(false)} className="text-4xl">
                    &times; {/* Close Icon */}
                  </button>
                </div>
                <div className="overflow-y-auto h-64">
                  <ul className="space-y-2">
                    {selectedTracks.map((track) => (
                      <li
                        key={track.id}
                        className="flex items-center justify-between bg-surface p-2  transition group"
                      >
                        <div className="flex items-center gap-3">
                          {track.album.images[0] ? (
                            <img
                              src={track.album.images[0]?.url}
                              height={55}
                              width={55}
                              className="rounded-full"
                              alt="Track Picture"
                            />
                          ) : (
                            <img
                              src={placeholderImg.src}
                              height={55}
                              width={55}
                              alt="Default Track Picture"
                            />
                          )}
                          <span className="px-2 transition-colors">
                            {track.name} - {track.artists[0].name}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromPlaylistBuilder(track)}
                          className="text-text-secondary hover:text-error transition-colors p-2 text-3xl"
                          aria-label="Remove track"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              </div>
            )}
          </Fragment>
        )}
      </PlaylistContext.Consumer>
    </Fragment>
  );
}
