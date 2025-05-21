import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";

import jarodGloverPic from "../public/jarodgloverpic.png";
import MainNavbar from "../src/components/Navbars/MainNavbar";
import textStyles from "../styles/Text.module.css";

export default function AboutMe() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text">
      <MainNavbar />
      <main className="flex-grow container mx-auto px-4 py-3">
        <h1 className="text-3xl font-semibold text-primary">About Me</h1>
        <div className="mt-4">
          <p>Hello, my name is Jarod Glover. Welcome!</p>
        </div>
        <div className="mt-4">
          <p>
            I graduated from Tufts University, played soccer, and majored in Computer Science. I have worked for Verb since January 2020, and I am a software engineer.
          </p>
          <p className="mt-2">
            At Tufts, I enjoyed the opportunity to take classes like AI, where I first saw how code could be written to learn from previous interactions, and GUI (Graphical User Interface) Object-Oriented Programming. 
            At that point, I built a suggestion app that would suggest a playlist, restaurant, or nature spot based on an initial survey and a facial analysis that could detect the displayed emotion.
          </p>
          <p className="mt-2">
            After graduating, I joined the Customer Experience team at Verb Energy. This position allowed me to have a first-hand look at what goes into managing relationships with customers and getting used to what might be needed for agents on a CRM. Eventually, I migrated to the Engineering team, where I developed as a Full Stack Engineer with a propensity for Backend Engineering, working mainly with Node.js, Vue, and GraphQL. I have also done some side projects using React, Django, and WebRTC, trying to experiment with different music and audio technologies.
          </p>
          <p className="mt-2">
            Most recently, I started as an Application Developer for the Kansas City Chiefs, where I am able to utilize my full stack knowledge to build out various apps for different football and business needs. This position is also allowing me to build a better repertoire of responsive design as I must ensure that the web applications show up well on various different device types.
          </p>
          <p className="mt-2">
            Outside of tech, I am also a huge soccer fan (more specifically, Liverpool) but also enjoy watching most sports. In my free time, I can be found listening to music, boxing, and playing soccer.
          </p>
        </div>
        <div className="mt-4 flex justify-center">
          <Image
            src={jarodGloverPic}
            alt="Jarod Glover"
            width={365}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </main>
      <footer className="bg-surface py-4 mt-12">
        <div className="text-center text-text-secondary">
          &copy; {new Date().getFullYear()} Audionest. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
