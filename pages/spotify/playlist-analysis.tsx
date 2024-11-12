import { Fragment } from "react";
import PlaylistAnalysisContainer from "../../src/components/Playlist/AnalysisContainer";
import SpotifyNavbar from "../../src/components/Navbars/SpotifyNavbar";
import SpotifyProvider from "../../src/providers/SpotifyProvider";
import ChartProvider from "../../src/providers/ChartProvider";

export default function PlaylistAnalysisPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1B1F24] text-[#F2E8CF]">
      <SpotifyProvider>
        <SpotifyNavbar />
        <div className="container mx-auto py-6">
          <ChartProvider>
            <PlaylistAnalysisContainer />
          </ChartProvider>
        </div>
      </SpotifyProvider>
    </div>
  );
}
