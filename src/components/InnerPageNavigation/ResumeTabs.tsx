import { Tab, Tabs, Row, Col } from "react-bootstrap";

function ResumeTabs() {
  return (
    <Tabs
      defaultActiveKey="portfolio-section"
      id="uncontrolled-tab-example"
      className="mb-3"
      fill
    >
      <Tab
        tabClassName="text-white"
        eventKey="portfolio-section"
        title="Portfolio"
      >
        <div className="pb-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px"}}>
          <div>
            <section
              className="bg-white"
              style={{ width: "40dvw", height: "50dvh", borderRadius: "15px" }}
            >
              <iframe
                style={{ width: "40dvw", height: "50dvh", borderRadius: "15px" }}
                src="https://www.alexandasher.tech/"
              ></iframe>
            </section>
            <div style={{ fontSize: "24px"}}>Alex and Asher Tech:</div>
            <div>Landing page build to showcase the product and services offered by Alex and Asher</div>
            <a href="https://www.alexandasher.tech/">Link to site</a>
            <div>Built with HTML, Javascript and CSS</div>
          </div>
          {/* <div>
            <section
              className="bg-white"
              style={{ width: "40dvw", height: "50dvh", borderRadius: "15px" }}
            >
              <iframe
                style={{ width: "40dvw", height: "50dvh", borderRadius: "15px" }}
                src="https://www.alexandasher.tech/"
              ></iframe>
            </section>
            <div style={{ fontSize: "24px"}}>Alex and Asher Tech:</div>
            <div>Landing page build to showcase the product and services offered by Alex and Asher</div>
            <a href="https://www.alexandasher.tech/">Link to site</a>
            <div>Built with HTML, Javascript and CSS</div>
          </div> */}
        </div>
      </Tab>
      <Tab
        tabClassName="text-white"
        eventKey="backend-experience"
        title="Backend"
      >
        <div className="pb-3">
          <strong>Technologies: </strong>
          <li>Node.js (Advanced Knowledge)</li>
          <li>Express.js (Advanced Knowledge)</li>
          <li>MongoDb (Advanced Knowledge)</li>
          <li>MSSQL (Intermediate Knowledge)</li>
          <li>Google Dialogflow (Advanced knowledge)</li>
          <li>Django (Working knowledge)</li>
        </div>
        <div>
          <strong>Work Experience</strong>
          <li>Verb Energy (January 2020-June 2023)</li>
          <ul>
            <li>
              Helped build out new version of our in-house custom CRM (Customer
              Relationship Manager)
            </li>
            <li>
              Re-wrote out in-house text service code in typescript and helped
              scope out a priority queue setup
            </li>
            <li>Involved in QA whenever we are prepping for a new release</li>
            <li>
              Make sure our microservices ecosystem flows properly at all times
            </li>
            <li>
              Built out serverless functions within Realm Atlas the we are able
              to access in our different apps through GraphQL
            </li>
            <li>
              Team lead for our automated response integration with Google
              Dialogflow
            </li>
          </ul>
        </div>
      </Tab>
      <Tab
        tabClassName="text-white"
        eventKey="frontend-experience"
        title="Frontend"
      >
        <Row>
          <Col>
            <div className="pb-3">
              <strong>Technologies: </strong>
              <li>Vue.js/Nuxt.js (Intermediate Knowledge)</li>
              <li>React.js/Next.js (Advanced Knowledge)</li>
              <li>Electron.js (Working knowledge)</li>
            </div>
            <div>
              <strong>Work Experience: </strong>
              <li>Verb Energy (January 2020-June 2023)</li>
              <ul>
                <li>
                  Helped build out original architecture for static building
                  template for a reusable product page
                </li>
                <li>
                  Helped integrate with the CMS (Content Management Services)
                  Contentful
                  <ul>
                    <li>
                      Allowed us to build out the site in a more modularized and
                      reusable manner
                    </li>
                  </ul>
                </li>

                <li>Built out the GTM tag integration and website triggers</li>
                <li>Involved in QA for all major releases</li>
              </ul>
              <li>Kansas City Chiefs (Feb 2024-Present)</li>
              <ul>
                <li>
                  Built out a platform for trainers to handle rehab schedules
                  and practice reports
                </li>
                <li>
                  Revamping scouting platform and ensure responsive design for
                  viewing on mobile devices and tablets
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Tab>
      {/* <Tab tabClassName="text-white" eventKey="projects" title="Projects">
        More content coming soon...
      </Tab> */}
    </Tabs>
  );
}

export default ResumeTabs;
