import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { schoolData } from '../data/schoolData';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-0 small">
              &copy; 2024 {schoolData.schoolInfo.name} Campus Guide | 
              Principal: {schoolData.schoolInfo.principal}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
