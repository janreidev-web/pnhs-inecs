import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faSearch, faComments, faRoute, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { useChatBot } from '../hooks/useChatBot';
import { schoolData } from '../data/schoolData';

const Home: React.FC = () => {
  const { sendMessage } = useChatBot();
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuickAsk = async () => {
    if (searchQuery.trim()) {
      await sendMessage(searchQuery.trim());
      // Scroll to chat section
      const chatElement = document.getElementById('chat');
      chatElement?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleQuickAsk();
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div 
        id="home"
        className="hero-section text-white text-center"
        style={{ 
          background: 'linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%)',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Container style={{ paddingTop: '50px' }}>
          <FontAwesomeIcon icon={faSchool} className="mb-3" style={{ fontSize: '4rem', color: 'white' }} />
          <h1 className="display-4 fw-bold mb-3">
            Pagbilao National High School
          </h1>
          <p className="lead mb-4">
            Campus Guide - Find your way around with our smart assistant
          </p>
          
          {/* Quick Search */}
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <InputGroup size="lg" className="mb-3">
              <Form.Control
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about the school..."
                className="border-0"
              />
              <Button variant="success" onClick={handleQuickAsk} className="border-0" style={{ backgroundColor: 'var(--contrast-orange)', borderColor: 'var(--contrast-orange)' }}>
                <FontAwesomeIcon icon={faSearch} className="me-2" />
                <span className="d-none d-sm-inline">Ask</span>
              </Button>
            </InputGroup>
          </div>
        </Container>
      </div>

      {/* Navigation Cards */}
      <Container className="py-5">
        <Row className="g-4 align-items-stretch">
          <Col xs={12} md={4}>
            <Card className="h-100 text-center p-4 shadow-sm location-card d-flex flex-column">
              <div className="text-center mb-3">
                <FontAwesomeIcon 
                  icon={faComments} 
                  style={{ fontSize: '3rem', color: 'var(--primary-green)' }}
                />
              </div>
              <Card.Title className="mb-3">Chat Assistant</Card.Title>
              <Card.Text className="mb-4 flex-grow-1">
                Ask questions about locations, directions, and facilities
              </Card.Text>
              <div className="mt-auto">
                <Button 
                  variant="primary"
                  onClick={() => {
                    const chatElement = document.getElementById('chat');
                    chatElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-100"
                  style={{ backgroundColor: 'var(--contrast-blue)', borderColor: 'var(--contrast-blue)' }}
                >
                  Chat Now
                </Button>
              </div>
            </Card>
          </Col>
          
          <Col xs={12} md={4}>
            <Card className="h-100 text-center p-4 shadow-sm location-card d-flex flex-column">
              <div className="text-center mb-3">
                <FontAwesomeIcon 
                  icon={faRoute} 
                  style={{ fontSize: '3rem', color: 'var(--primary-green)' }}
                />
              </div>
              <Card.Title className="mb-3">Get Directions</Card.Title>
              <Card.Text className="mb-4 flex-grow-1">
                Step-by-step navigation between any campus locations
              </Card.Text>
              <div className="mt-auto">
                <Button 
                  variant="primary"
                  onClick={() => {
                    const directionsElement = document.getElementById('directions');
                    directionsElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-100"
                  style={{ backgroundColor: 'var(--contrast-blue)', borderColor: 'var(--contrast-blue)' }}
                >
                  Navigate
                </Button>
              </div>
            </Card>
          </Col>
          
          <Col xs={12} md={4}>
            <Card className="h-100 text-center p-4 shadow-sm location-card d-flex flex-column">
              <div className="text-center mb-3">
                <FontAwesomeIcon 
                  icon={faMapMarkedAlt} 
                  style={{ fontSize: '3rem', color: 'var(--primary-green)' }}
                />
              </div>
              <Card.Title className="mb-3">Browse Locations</Card.Title>
              <Card.Text className="mb-4 flex-grow-1">
                Explore all buildings, facilities, and areas on campus
              </Card.Text>
              <div className="mt-auto">
                <Button 
                  variant="primary"
                  onClick={() => {
                    const locationsElement = document.getElementById('locations');
                    locationsElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-100"
                  style={{ backgroundColor: 'var(--contrast-blue)', borderColor: 'var(--contrast-blue)' }}
                >
                  Locations
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Quick Info */}
      <Container className="py-4" style={{ backgroundColor: 'var(--background-green)' }}>
        <Row className="text-center">
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <h5 className="mb-2" style={{ color: 'var(--primary-green)' }}>School Hours</h5>
            <p className="text-muted small mb-0">
              Mon-Fri: {schoolData.schoolInfo.operatingHours.mondayToFriday}<br />
              Sat: {schoolData.schoolInfo.operatingHours.saturday}<br />
              Sun: {schoolData.schoolInfo.operatingHours.sunday}
            </p>
          </Col>
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <h5 className="mb-2" style={{ color: 'var(--primary-green)' }}>Principal</h5>
            <p className="text-muted small mb-0">{schoolData.schoolInfo.principal}</p>
          </Col>
          <Col xs={12} md={4}>
            <h5 className="mb-2" style={{ color: 'var(--primary-green)' }}>Address</h5>
            <p className="text-muted small mb-0">{schoolData.schoolInfo.address}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
