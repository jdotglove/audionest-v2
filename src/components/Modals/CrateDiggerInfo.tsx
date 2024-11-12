import { Fragment, useContext, useEffect, useState } from "react";
import SpotifyContext from "../../contexts/SpotifyContext";

export default function CrateDiggerInfo() {
  const { acknowledgeInfoModal, checkIfSeenInfoModal } = useContext(SpotifyContext);
  
  const [showInfoModal, setShowInfoModal] = useState(false);
  
  useEffect(() => {
    setShowInfoModal(!checkIfSeenInfoModal());
  }, [checkIfSeenInfoModal]);

  const handleCloseInfoModal = () => {
    acknowledgeInfoModal();
    setShowInfoModal(false);
  };

  return (
    <Fragment>
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-[#2D3748] text-[#F2E8CF] rounded-lg shadow-lg p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Virtual Crate Digger Walkthrough</h2>
            <div>
              <p>Welcome to Audionest's Virtual Spotify Crate Digger!</p>
              <p className="mt-2">
                The purpose of this section of Audionest is to recreate the tedious task of navigating through various generated playlists and search functionalities in Spotify to streamline discovery and playlist making.
              </p>
              <p className="mt-2">
                Gone are the times of people routinely sifting through crates of old records to toss something on the vinyl with the introduction of modern stream platforms (unless you're a purist or someone who loves the aesthetic of using a record player, if you are, kudos). With that being said, I did my best to recreate the same feel, except for Spotify.
              </p>
            </div>
            <div className="mt-4">
              Long story short, here are the current features:
              <ul className="list-disc list-inside mt-2">
                <li className="font-semibold underline">
                  Recommendation Generator
                  <ul className="list-disc list-inside ml-4">
                    <li>You can add different seeds (items that will be considered when generating a recommendation "crate").</li>
                    <li>You can add up to 5 seeds in combination (3 artists and 2 tracks or 5 artists).</li>
                    <li>You can generate as many times as you would like to sift through "crates" quickly.</li>
                    <li>Once you've generated a crate, you can either add it to your live queue or add it to the playlist builder.</li>
                    <li>The playlist builder will allow you to save and name your playlist from the web page.</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={handleCloseInfoModal} 
                className="bg-[#0097A7] text-white px-4 py-2 rounded hover:bg-[#0aabb0]"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
