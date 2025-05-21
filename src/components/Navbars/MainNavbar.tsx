import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function MainNavbar() {
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const offCanvasRef = useRef(null);
  const toggleButtonRef = useRef(null); // Ref for the toggle button

  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = () => setShowOffCanvas(true);

  const handleClickOutside = (event) => {
    if (offCanvasRef.current && !offCanvasRef.current.contains(event.target)) {
      handleCloseOffCanvas();
    }
  };

  // Attach the click event listener to the document
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Desktop Navbar */}
      <nav className="hidden lg:flex bg-surface text-text">
        <div className="container px-4 py-2 flex gap-5 items-center">
          <a href="/" className="text-3xl font-bold">
            Audionest
          </a>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="lg:hidden bg-surface text-text">
        <div className="px-4 py-2 flex justify-between items-center">
          <a href="/" className="text-3xl font-bold">
            Audionest
          </a>
          <button onClick={handleShowOffCanvas} className="text-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
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
        </div>
      </nav>

      {/* Offcanvas Menu */}
      {showOffCanvas && (
        <div className="fixed inset-0 bg-surface text-text z-50 px-4 py-2">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">AudioNest</h2>
            <button onClick={handleCloseOffCanvas} className="text-4xl">
              &times; {/* Close Icon */}
            </button>
          </div>
          <div className="mt-4">
            <nav className="space-y-2">
              <Link
                href="/about-me"
                className="block hover:text-primary py-2"
              >
                About Me
              </Link>
              <Link
                href="/contact"
                className="block hover:text-primary py-2"
              >
                Contact/Links
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
