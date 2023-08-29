import { Fragment } from "react";
import { Container } from "react-bootstrap";

import CrateDiggerInfo from "../../src/components/Modals/CrateDiggerInfo";
import RecommendationGeneratorContainer from "../../src/components/Recommendation/GeneratorContainer";
import SpotifyNavbar from "../../src/components/Navbars/SpotifyNavbar";
import SpotifyProvider from "../../src/providers/SpotifyProvider";
import ChartProvider from "../../src/providers/ChartProvider";

export default function RecommendationGeneratorPage() {
  return (
    <Fragment>
      <SpotifyProvider>
        <SpotifyNavbar />
        <Fragment>
          <CrateDiggerInfo />
          <Container className="py-3">
            <ChartProvider>
              <RecommendationGeneratorContainer />
            </ChartProvider>
          </Container>
        </Fragment>
      </SpotifyProvider>
    </Fragment>
  );
}
