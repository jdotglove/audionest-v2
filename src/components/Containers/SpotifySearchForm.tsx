import { Fragment } from "react";
import { Image, Card, Alert, Button, ListGroup } from "react-bootstrap";
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
  return (
    <Fragment>
      <RecommendationContext.Consumer>
        {({
          addSeedArtist,
          addSeedTrack,
          showSeedAlert,
          seedAddResult,
          dismissAddSeedAlert,
        }) => (
          <Fragment>
            <Card style={{ width: "24rem", height: "35rem" }}>
              <Card.Title>
                <h2 className="px-3 text-white">Seed {searchType}</h2>
                <div className="px-3 input-group mb-3">
                  <span
                    className="text-black input-group-text"
                    id={`search-${searchType.toLowerCase()}`}
                  >
                    <SearchIcon />
                  </span>
                  <input
                    type="text"
                    ref={searchInputRef}
                    aria-label={`Search ${searchType}`}
                    aria-describedby={`search-${searchType.toLowerCase()}`}
                  />
                  <Button
                    type="button"
                    className="btn btn-primary px-1 mx-1"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </div>
                <Alert
                  show={showSeedAlert}
                  variant={seedAddResult}
                  onClose={() => dismissAddSeedAlert()}
                  dismissible
                >
                  {seedAddResult === "success" ? (
                    <div>Added {searchType} Seed!</div>
                  ) : (
                    <div>Error Adding {searchType} Seed</div>
                  )}
                </Alert>
                <div className="px-3">
                  <h5>Search Results:</h5>
                </div>
              </Card.Title>
              <Card.Body className="overflow-scroll">
                <SpotifyContext.Consumer>
                  {({ artistSearchResults, trackSearchResults }) => (
                    <ListGroup variant="flush">
                      
                      { searchType === "Artists" ? (
                        artistSearchResults.map((artist) => (
                        <div
                          key={artist.id}
                          onClick={() => addSeedArtist(artist)}
                        >
                          <ListGroup.Item
                            action
                            variant="light"
                            className="d-flex justify-content-between align-items-center"
                          >
                            {artist.images[0] ? (
                              <Image
                                src={artist.images[0]?.url}
                                height={55}
                                width={55}
                                roundedCircle
                                alt={`Arist Profile Picture`}
                              />
                            ) : (
                              <NextImage
                                src={placeholderImg}
                                height={55}
                                width={55}
                                alt={`Default Artist Profile Picture`}
                              />
                            )}
                            {artist.name}
                            <AddIcon />
                          </ListGroup.Item>
                        </div>
                      ))
                    ) : (
                      trackSearchResults.map((track) => (
                        <div
                          key={track.id}
                          onClick={() => addSeedTrack(track)}
                        >
                          <ListGroup.Item
                            action
                            variant="light"
                            className="d-flex justify-content-between align-items-center"
                          >
                            {track.album.images[0] ? (
                              <Image
                                src={track.album.images[0]?.url}
                                height={55}
                                width={55}
                                roundedCircle
                                alt="Track Album Picture"
                              />
                            ) : (
                              <NextImage
                                src={placeholderImg}
                                height={55}
                                width={55}
                                alt="Default Album Profile Picture"
                              />
                            )}
                            {track.name} - {track.artists[0].name}
                            <AddIcon />
                          </ListGroup.Item>
                        </div>
                      ))
                    )}
                    </ListGroup>
                  )}
                </SpotifyContext.Consumer>
              </Card.Body>
            </Card>
          </Fragment>
        )}
      </RecommendationContext.Consumer>
    </Fragment>
  );
}
