import { Fragment, useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

import SpotifyContext from "../../contexts/SpotifyContext";

export default function CrateDiggerInfo() {
  const { acknowledgeInfoModal, checkIfSeenInfoModal } = useContext(SpotifyContext);
  
  const [showInfoModal, setShowInfoModal] = useState(false);
  useEffect(() => {
    setShowInfoModal(!checkIfSeenInfoModal())
  }, [])

  const handleCloseInfoModal = () => {
    acknowledgeInfoModal();
    setShowInfoModal(false);
  };
  const handleShowInfoModal = () => setShowInfoModal(true);

  return (
    <Fragment>
      <Modal
        size="xl"
        show={showInfoModal}
        onHide={handleCloseInfoModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Virtual Crate Digger Walkthrough</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Welcome to Audionest's Virtual Spotify Crate Digger!</p>
            <p>
              The purpose of this section of Audionest is to recreate the
              tedious task of navigating through various generated playlists and
              search functionalities in Spotify to streamline discovery and
              playlist making.
            </p>
            <p>
              Gone are the times of people routinely sifting through crates of
              old records to toss something on the vinyl with the introduction
              modern stream platforms (unless you're a purist or someone who
              loves the aesthetic of using a record player, if you are, kudos).
              With that being said I did my best to recreate the same feel,
              except for Spotify.
            </p>
          </div>
          <div>
            Long story short here are the current features:
            <ul>
              <li>
                <span
                  style={{
                    fontWeight: 700,
                    textDecoration: "underline",
                  }}
                >
                  Recommendation Generator
                </span>
                <ul>
                  <li>
                    You can add different seeds (items that will be considered
                    when generating a recommendation "crate")
                  </li>
                  <li>
                    You can add up to 5 seeds in combination (3 artists and 2
                    tracks or 5 artists)
                  </li>
                  <li>
                    You can generate as many times as you would like to sift
                    through "crates" quickly
                  </li>
                  <li>
                    Once you've generated a crate you can either add it to your
                    live queue or you can add it to the playlist builder
                  </li>
                  <li>
                    The playlist builder will allow you to save and name your
                    playlist from the web page
                  </li>
                </ul>
              </li>
            </ul>
            <ul>
              <li>
                <span
                  style={{
                    fontWeight: 700,
                    textDecoration: "underline",
                  }}
                >
                  Playlist Analysis
                </span>
                <ul>
                  <li>Pure vibes at this point</li>
                  <li>
                    Shows you the audio features of your playlists/tracks in
                    that playlist
                  </li>
                  <li>
                    Thought it would be cool to see the characteristics of some
                    of your favorite songs
                  </li>
                </ul>
              </li>
            </ul>
            <ul>
              <li>
                <span
                  style={{
                    fontWeight: 700,
                    textDecoration: "underline",
                  }}
                >
                  User Profile
                </span>
                <ul>
                  <li>Once again there for the vibes</li>
                  <li>
                    Shows you a live look at your current top tracks and artists
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <p>
              Will add more functionality to the site as I think of it but if
              you want anything quicker feel free to send some feedback
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseInfoModal}>
            Acknowledge
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}
