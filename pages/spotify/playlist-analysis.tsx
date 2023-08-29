import { Fragment } from "react";
import { Container } from "react-bootstrap";

import PlaylistAnalysisContainer from "../../src/components/Playlist/AnalysisContainer";
import SpotifyNavbar from "../../src/components/Navbars/SpotifyNavbar";
import SpotifyProvider from "../../src/providers/SpotifyProvider";
import ChartProvider from "../../src/providers/ChartProvider";

export default function PlaylistAnalysisPage() {
  return (
    <Fragment>
      <SpotifyProvider>
        <SpotifyNavbar />
        <Container className="py-3">
          <ChartProvider>
            <PlaylistAnalysisContainer />
          </ChartProvider>
        </Container>
      </SpotifyProvider>
    </Fragment>
  );
}
