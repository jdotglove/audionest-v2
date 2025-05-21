import introImge from "../src/assets/intro-image.png";

import MainNavbar from '../src/components/Navbars/MainNavbar';
import { authenticateSpotify } from "../src/middleware/spotify";

export default function Home() {
  const authenticateSpotifyUser = async () => {
    sessionStorage.clear();
    await authenticateSpotify();
  };

  return (
    <div className="bg-background text-text min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <MainNavbar />

      {/* Main Content */}
      <div className="container mx-auto flex-1 text-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-text">
          Welcome to Audionest
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-accent">
          Discover the world of music, tailor your experience, and vibe to the rhythm.
        </p>
        <button 
          className="bg-primary text-text font-semibold py-2 px-6 rounded-md shadow-lg hover:bg-primary-dark hover:text-text border border-primary transition duration-300"
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
          className="w-full sm:w-3/4 md:w-2/3 lg:w-[32dvw] mx-auto rounded-lg shadow-lg border border-border"
        />
      </div>

      {/* Footer */}
      <footer className="bg-surface py-4 mt-12">
        <div className="text-center text-text-secondary">
          &copy; {new Date().getFullYear()} Audionest. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
