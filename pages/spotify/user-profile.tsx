import React from "react";

import SpotifyNavbar from "../../src/components/Navbars/SpotifyNavbar";
import UserProfileContainer from "../../src/components/Containers/UserProfileContainer";
import SpotifyProvider from "../../src/providers/SpotifyProvider";

export default function UserProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1B1F24] text-[#F2E8CF]">
      <SpotifyProvider>
        <SpotifyNavbar />
        <div className="container mx-auto py-6">
          <UserProfileContainer />
        </div>
      </SpotifyProvider>
    </div>
  );
}
