import React from "react";
import { Container } from "react-bootstrap";

import CrateDiggerInfo from "../../src/components/Modals/CrateDiggerInfo";
import RecommendationGeneratorContainer from "../../src/components/Recommendation/GeneratorContainer";
import SpotifyNavbar from "../../src/components/Navbars/SpotifyNavbar";
import SpotifyProvider from "../../src/providers/SpotifyProvider";
import ChartProvider from "../../src/providers/ChartProvider";

export default function RecommendationGeneratorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1B1F24] text-[#F2E8CF]">
      <SpotifyProvider>
        <SpotifyNavbar />
        <React.Fragment>
          <CrateDiggerInfo />
          <section className="container self-center py-3">
            <ChartProvider>
              <RecommendationGeneratorContainer />
            </ChartProvider>
          </section>
        </React.Fragment>
      </SpotifyProvider>
    </div>
  );
}
