import { Container, Row, Col } from 'react-bootstrap';

import MainNavbar from '../src/components/Navbars/MainNavbar';
import ResumeTabs from '../src/components/InnerPageNavigation/ResumeTabs';
import textStyles from '../styles/Text.module.css';

export default function Resume() {
  return (
    <div>
      <MainNavbar />
      <Container>
        <Row className="pt-3">
          <Col>
            <h1 className={textStyles.Xl}>Résumé</h1>
          </Col>
        </Row>
        <ResumeTabs />
      </Container>
    </div>
  );
}
