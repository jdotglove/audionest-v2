import { Fragment } from "react";
import { Container } from "react-bootstrap";

import SpotifyNavbar from "../../src/components/Navbars/SpotifyNavbar";
import UserProfileContainer from "../../src/components/Containers/UserProfileContainer";
import SpotifyProvider from "../../src/providers/SpotifyProvider";

export default function UserProfilePage() {
  return (
    <Fragment>
      <SpotifyProvider>
        <SpotifyNavbar />
        <Container className="py-3">
          <UserProfileContainer />
        </Container>
      </SpotifyProvider>
    </Fragment>
  );
}
