import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faComments, faRoute, faMapMarkedAlt, faCube } from '@fortawesome/free-solid-svg-icons';

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
      className="shadow-lg"
      style={{ 
        backgroundColor: 'var(--bg-dark) !important',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-dark)'
      }}
    >
      <Container>
        <Navbar.Brand 
          href="#home" 
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          style={{ 
            color: 'white !important',
            fontWeight: '600',
            fontSize: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <FontAwesomeIcon icon={faSchool} />
          PNHS Campus Guide
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          style={{ 
            borderColor: 'var(--border-color)',
            backgroundColor: 'transparent'
          }}
        >
          <span style={{ color: 'white' }}>☰</span>
        </Navbar.Toggle>
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              style={{ 
                color: 'var(--text-light) !important',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius)',
                transition: 'all 0.2s ease',
                margin: '0 0.25rem'
              }}
              className="nav-link-hover"
            >
              <FontAwesomeIcon icon={faSchool} className="me-2" />
              Home
            </Nav.Link>
            
            <Nav.Link
              href="#3d-map"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('3d-map');
              }}
              style={{ 
                color: 'var(--text-light) !important',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius)',
                transition: 'all 0.2s ease',
                margin: '0 0.25rem'
              }}
              className="nav-link-hover"
            >
              <FontAwesomeIcon icon={faCube} className="me-2" />
              3D Map
            </Nav.Link>
            
            <Nav.Link
              href="#chat"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('chat');
              }}
              style={{ 
                color: 'var(--text-light) !important',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius)',
                transition: 'all 0.2s ease',
                margin: '0 0.25rem'
              }}
              className="nav-link-hover"
            >
              <FontAwesomeIcon icon={faComments} className="me-2" />
              Campus Assistant
            </Nav.Link>
            
            <Nav.Link
              href="#directions"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('directions');
              }}
              style={{ 
                color: 'var(--text-light) !important',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius)',
                transition: 'all 0.2s ease',
                margin: '0 0.25rem'
              }}
              className="nav-link-hover"
            >
              <FontAwesomeIcon icon={faRoute} className="me-2" />
              Directions
            </Nav.Link>
            
            <Nav.Link
              href="#locations"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('locations');
              }}
              style={{ 
                color: 'var(--text-light) !important',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius)',
                transition: 'all 0.2s ease',
                margin: '0 0.25rem'
              }}
              className="nav-link-hover"
            >
              <FontAwesomeIcon icon={faMapMarkedAlt} className="me-2" />
              Locations
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      
      <style>{`
        .nav-link-hover:hover {
          color: white !important;
          background-color: rgba(255, 255, 255, 0.1) !important;
          transform: translateY(-1px);
        }
        
        .navbar-toggler {
          border: 1px solid var(--border-color) !important;
        }
        
        .navbar-toggler:focus {
          box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.1) !important;
        }
        
        @media (max-width: 768px) {
          .navbar-nav {
            padding: 1rem 0;
          }
          
          .nav-link {
            margin: 0.25rem 0 !important;
          }
        }
      `}</style>
    </Navbar>
  );
};

export default Navigation;
