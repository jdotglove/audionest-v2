import { Col, Container, Row } from "react-bootstrap";

import MainNavbar from "../src/components/Navbars/MainNavbar";

export default function Contact() {
  return (
    <div className="bg-[#1B1F24] text-[#F2E8CF] min-h-screen">
      <MainNavbar />
      <div className="container mx-auto px-4 py-6">
        <main className="pt-3">
          <h1 className="text-3xl font-semibold text-[#0097A7]">
            Contact Information
          </h1>
        </main>
        <div className="mt-4 text-lg">
          <div className="mb-4">
            <strong>Email: </strong>
            <a
              href="mailto:glover.jarod@gmail.com"
              className="text-[#0097A7] hover:underline"
            >
              glover.jarod@gmail.com
            </a>
          </div>
          <div className="mb-4">
            <strong>Links: </strong>
            <ul className="list-disc list-inside">
              <li>
                <a
                  href="https://www.linkedin.com/in/jarod-glover/"
                  className="text-[#0097A7] hover:underline"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/jdotglove"
                  className="text-[#0097A7] hover:underline"
                >
                  Github
                </a>
              </li>
              {/* Uncomment this if you want to include the LeetCode link
              <li>
                <a href="https://leetcode.com/jdotglove/" className="text-[#0097A7] hover:underline">LeetCode</a>
              </li> */}
            </ul>
          </div>
        </div>
        {/* Uncomment this if you want to include the contact submission form notice
        <div className="pt-3">
          <em>Contact Submission Form Coming Soon!</em>
        </div> */}
      </div>
    </div>
  );
}
