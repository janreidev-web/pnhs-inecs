import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faComments, faRoute, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

const Navigation: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 76; // Account for fixed navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Navbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      sticky="top" 
      className="shadow-sm"
      style={{ 
        backgroundColor: 'var(--dark-green) !important',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1030
      }}
    >
      <Container>
        <Navbar.Brand 
          href="#home" 
          onClick={() => scrollToSection('home')}
          className="fw-bold"
          style={{ color: 'white' }}
        >
          <FontAwesomeIcon icon={faSchool} className="me-2 d-none d-sm-inline" />
          <span className="d-sm-none">PNHS</span>
          <span className="d-none d-sm-inline">PNHS Campus Guide</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-center">
            <Nav.Link 
              href="#home" 
              onClick={() => scrollToSection('home')}
              className="mx-2"
              style={{ color: 'white', transition: 'background-color 0.3s ease' }}
            >
              <FontAwesomeIcon icon={faSchool} className="me-2 d-none d-sm-inline" />
              Home
            </Nav.Link>
            <Nav.Link 
              href="#chat" 
              onClick={() => scrollToSection('chat')}
              className="mx-2"
              style={{ color: 'white', transition: 'background-color 0.3s ease' }}
            >
              <FontAwesomeIcon icon={faComments} className="me-2 d-none d-sm-inline" />
              Chat
            </Nav.Link>
            <Nav.Link 
              href="#directions" 
              onClick={() => scrollToSection('directions')}
              className="mx-2"
              style={{ color: 'white', transition: 'background-color 0.3s ease' }}
            >
              <FontAwesomeIcon icon={faRoute} className="me-2 d-none d-sm-inline" />
              Directions
            </Nav.Link>
            <Nav.Link 
              href="#locations" 
              onClick={() => scrollToSection('locations')}
              className="mx-2"
              style={{ color: 'white', transition: 'background-color 0.3s ease' }}
            >
              <FontAwesomeIcon icon={faMapMarkedAlt} className="me-2 d-none d-sm-inline" />
              Locations
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
