import { Fragment, useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import FontProvider from "../../providers/FontProvider";
import SpotifyContext from "../../contexts/SpotifyContext";
export default function SpotifyNavbar() {
  const { user } = useContext(SpotifyContext);
  const [activeKey, setActiveKey] = useState("");
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = () => setShowOffCanvas(true);

  useEffect(() => {
    setActiveKey(
      window.location.pathname.split("/")[2] || "recommendation-generator"
    );
  }, []);

  return (
    <Fragment>
      {/* Desktop Navbar */}
      <nav className="flex justify-between bg-[#37474F] text-[#F2E8CF]">
        <div className="container px-4 py-2 flex gap-5 items-center">
          <a href="/" className="text-3xl font-bold">
            AudioNest
          </a>
          <div className="hidden lg:flex text-xl space-x-4">
            <Link
              href="recommendation-generator"
              className={`hover:underline ${
                activeKey === "recommendation-generator" ? "underline" : ""
              }`}
            >
              Recommendation Generator
            </Link>
            <Link
              href="playlist-analysis"
              className={`hover:underline ${
                activeKey === "playlist-analysis" ? "underline" : ""
              }`}
            >
              Playlist Analysis
            </Link>
            <Link
              href="user-profile"
              className={`hover:underline ${
                activeKey === "user-profile" ? "underline" : ""
              }`}
            >
              User Profile
            </Link>
          </div>
        </div>
        <section className="px-5 text-lg self-center">
          <div className="hidden lg:flex text-lg w-[20dvw] items-center justify-end ">
            <span className="mr-2">Welcome, {user?.display_name}!</span>
            {user?.images[0] && (
              <img
                src={user.images[0].url}
                height={30}
                width={30}
                className="rounded-full"
                alt="Profile Picture"
              />
            )}
          </div>
          <button
            onClick={handleShowOffCanvas}
            className="lg:hidden ml-2 text-3xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </section>
      </nav>

      {/* Offcanvas Menu for Mobile */}
      {showOffCanvas && (
        <div className="fixed inset-0 bg-[#37474F] text-[#F2E8CF] z-50 px-4 py-2">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">AudioNest</h2>
            <button onClick={handleCloseOffCanvas} className="text-4xl">
              &times; {/* Close Icon */}
            </button>
          </div>
          <div className="mt-4">
            <nav className="space-y-2">
              <Link href="recommendation-generator" className={`block text-lg ${activeKey === "recommendation-generator" ? "underline" : ""}`}>
                Recommendation Generator
              </Link>
              <Link href="playlist-analysis" className={`block text-lg ${activeKey === "playlist-analysis" ? "underline" : ""}`}>
                Playlist Analysis
              </Link>
              <Link href="user-profile" className={`block text-lg ${activeKey === "user-profile" ? "underline" : ""}`}>
                User Profile
              </Link>
            </nav>
          </div>
        </div>
      )}
    </Fragment>
  );
}
