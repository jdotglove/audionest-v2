import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';

import jarodGloverPic from '../public/jarodgloverpic.png';
import MainNavbar from '../src/components/Navbars/MainNavbar';
import textStyles from '../styles/Text.module.css';

export default function AboutMe() {
  return (
    <div>
      <MainNavbar />
      <Container>
        <Row className="pt-3">
          <Col>
            <h1 className={textStyles.medium}>About Me</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              Hello, my name is Jarod Glover. Welcome!
            </p>
          </Col>
        </Row>
        <Row>
          <Col className={textStyles.medium}>
            <p>
              I graduated from Tufts University, played soccer, and majored in Computer Science.
              I have worked for Verb since January 2020, and I am a software engineer.
            </p>
            <p>
              At Tufts, I enjoyed the opportunity to take classes like AI, where I first saw how code could be written to learn from previous interactions, and GUI (Graphical User Interface) 
              Object-Oriented Programming. At that point, I built a suggestion app that would suggest a playlist, restaurant, or Nature spot based on an initial survey and a facial analysis 
              that could detect the displayed emotion.
            </p>
            <p>  
              After graduating, I worked in a Tech consulting position before joining the Customer Experience team at Verb Energy. This position allowed me to have a first-hand look at what goes into managing relationships 
              with customers and getting used to what might be needed for agents on a CRM. Eventually, I migrated to the Engineering team, where I developed as a Full Stack Engineer with a propensity for Backend Engineering, 
              working mainly with Node.js, Vue, and GraphQL. I have also done some side projects using React, Django, and WebRTC, trying to experiment with different music and audio technologies.
            </p>
            <p>
              Outside of tech, I am also a huge soccer fan (more specifically, Liverpool) but also enjoy watching most sports.
              In my free time I can be found, listening to music, boxing, dancing, playing soccer, or playing chess.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Image
              src={jarodGloverPic}
              alt="jarod glover pic"
              width={365}
              height={400}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
