import {
    Col,
    Container,
    Row,
  } from 'react-bootstrap';
  
  import MainNavbar from '../src/components/Navbars/MainNavbar';
  
  export default function Contact() {
    return (
      <div>
        <MainNavbar />
        <Container>
          <Row className="pt-3">
            <Col>
              <main>
                <h1>Contact Information</h1>
              </main>
            </Col>
          </Row>
          <Row>
            <Col style={{ fontSize: 'large' }}>
              <div>
                <strong>Email: </strong>
                <ul>
                  <a href="mailto:glover.jarod@gmail.com">glover.jarod@gmail.com</a>
                </ul>
              </div>
              <div>
                <strong>Links: </strong>
                <ul>
                  <a href="https://www.linkedin.com/in/jarod-glover/">LinkedIn</a>
                </ul>
                <ul>
                  <a href="https://github.com/jdotglove">Github</a>
                </ul>
                {/* <ul>
                  <a href="https://leetcode.com/jdotglove/">LeetCode</a>
                </ul> */}
              </div>
            </Col>
          </Row>
          {/* <Row className="pt-3">
            <Col>
              <em>Contact Submission Form Coming Soon!</em>
            </Col>
          </Row> */}
        </Container>
      </div>
    );
  }
  