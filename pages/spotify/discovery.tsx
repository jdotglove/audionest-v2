import { Fragment } from "react";

import DiscoveryDisplay from "../../src/components/Discovery/Display";
import DiscoveryProvider from "../../src/providers/DiscoveryProvider";
import SpotifyNavbar from "../../src/components/Navbars/SpotifyNavbar";
import SpotifyProvider from "../../src/providers/SpotifyProvider";
import ChartProvider from "../../src/providers/ChartProvider";

export default function DiscoveryPage() {
  return (
    <Fragment>
      <SpotifyProvider>
        <SpotifyNavbar />
        <DiscoveryProvider>
          <ChartProvider>
            <DiscoveryDisplay />
          </ChartProvider>
        </DiscoveryProvider>
      </SpotifyProvider>
    </Fragment>
  );
}
