import { Tab, Tabs, Row, Col } from 'react-bootstrap';

function ResumeTabs() {
  return (
    <Tabs
      defaultActiveKey="backend-experience"
      id="uncontrolled-tab-example"
      className="mb-3"
      fill
    >
      <Tab
        tabClassName="text-white"
        eventKey="backend-experience"
        title="Backend"
      >
        <div className="pb-3">
          <strong>Technologies: </strong>
          <li>Node.js (Advanced Knowledge)</li>
          <li>Express.js (Advanced Knowledge)</li>
          <li>GraphQL (Advanced Knowledge)</li>
          <li>MongoDb (Advanced Knowledge)</li>
          <li>Google Dialogflow (Advanced knowledge)</li>
          <li>Django (Working knowledge)</li>
        </div>
        <div>
          <strong>Work Experience</strong>
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
            Built out serverless functions within Realm Atlas the we are able to
            access in our different apps through GraphQL
          </li>
          <li>
            Team lead for our automated response integration with Google
            Dialogflow
          </li>
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
              <li>React.js/Next.js (Intermediate Knowledge)</li>
              <li>Electron.js (Working knowledge)</li>
            </div>
            <div>
              <strong>Work Experience: </strong>
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
