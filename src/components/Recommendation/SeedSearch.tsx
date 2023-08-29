import { Fragment, useState, useRef, useContext } from "react";
import {
  Offcanvas,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";

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
      searchArtistInput.current.value = ""
    } else {
      searchTrackInput.current.value = ""
    }
  };

  const handleSearchArtists = () => {
    const searchValue = searchArtistInput.current.value;
    if (searchValue !== "") {
      spotifyContext.searchItems("artist", searchValue);
    }
  };
  const handleSearchTracks = () => {
    const searchValue = searchTrackInput.current.value;
    if (searchValue !== "") {
      spotifyContext.searchItems("track", searchValue);
    }
  };
  return (
    <Fragment>
      <RecommendationContext.Consumer>
        {({
          toggleShowSeedSearch,
          showSeedSearch,
        }) => (
          <Fragment>
            <Offcanvas
              placement="start"
              show={showSeedSearch}
              onHide={() => toggleShowSeedSearch(false)}
            >
              <Offcanvas.Header closeButton closeVariant="white">
                <Offcanvas.Title>Playlist Seed Search</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Row className="px-3">
                  <Col md={3}>
                    <input
                      type="radio"
                      id="artist-search"
                      name="seed_search_selection"
                      checked={searchTarget === "Artists"}
                      value="Artists"
                      ref={artistSearchSelected}
                      onChange={onOptionChange}
                    />{" "}
                    <label htmlFor="artist-search">Artists</label>
                  </Col>
                  <Col md={3}>
                    <input
                      type="radio"
                      id="track-search"
                      name="seed_search_selection"
                      checked={searchTarget === "Tracks"}
                      value="Tracks"
                      ref={trackSearchSelected}
                      onChange={onOptionChange}
                    />{" "}
                    <label htmlFor="track-search">Tracks</label>
                  </Col>
                </Row>
                <ListGroup className="pt-3" variant="flush">
                  <Fragment>
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
                  </Fragment>
                </ListGroup>
              </Offcanvas.Body>
            </Offcanvas>
          </Fragment>
        )}
      </RecommendationContext.Consumer>
    </Fragment>
  );
}
