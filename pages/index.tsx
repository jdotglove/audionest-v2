import introImge from "../src/assets/intro-image.png";

import MainNavbar from '../src/components/Navbars/MainNavbar';
import { authenticateSpotify } from "../src/middleware/spotify";

export default function Home() {
  const authenticateSpotifyUser = async () => {
    sessionStorage.clear();
    await authenticateSpotify();
  };

  return (
    <div className="bg-[#1B1F24] text-[#E0E0E0] min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <MainNavbar />

      {/* Main Content */}
      <div className="container mx-auto flex-1 text-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-[#F2E8CF]">
          Welcome to Audionest
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-[#F9A825]">
          Discover the world of music, tailor your experience, and vibe to the rhythm.
        </p>
        <button 
          className="bg-[#0097A7] text-white font-semibold py-2 px-6 rounded-md shadow-lg hover:bg-[#0aabb0] hover:text-[#E0E0E0] border border-[#0097A7] transition duration-300"
          onClick={async () => {
            await authenticateSpotifyUser();
          }}
        >
          Explore Spotify Crate Digger
        </button>
      </div>

      {/* Image Section */}
      <div className="container mx-auto mt-8 px-4">
        <img
          src={introImge.src}
          alt="Music Art"
          className="w-full sm:w-3/4 md:w-2/3 lg:w-[35dvw] mx-auto rounded-lg shadow-lg border border-[#37474F]"
        />
      </div>

      {/* Footer */}
      <footer className="bg-[#37474F] py-4 mt-12">
        <div className="text-center text-[#E0E0E0]">
          &copy; {new Date().getFullYear()} Audionest. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
