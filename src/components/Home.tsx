import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faSearch, faComments, faRoute, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { useChatBot } from '../hooks/useChatBot';
import { schoolData } from '../data/schoolData';

const Home: React.FC = () => {
  const { sendMessage } = useChatBot();
  const [searchQuery, setSearchQuery] = useState('');

  const handleChatScroll = () => {
    const chatElement = document.getElementById('chat');
    chatElement?.scrollIntoView({ behavior: 'smooth' });
  };

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
        className="hero-section text-center"
        style={{ 
          background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 50%, var(--primary-light) 100%)',
          minHeight: '120vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: 'var(--spacing-2xl) 0'
        }}
      >
        {/* Green Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(76, 175, 80, 0.3) 0%, transparent 50%), 
                           radial-gradient(circle at 80% 20%, rgba(129, 199, 132, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, rgba(56, 142, 60, 0.25) 0%, transparent 70%)`,
          zIndex: 1
        }} />
        
        <Container style={{ paddingTop: '80px', position: 'relative', zIndex: 2 }}>
          <div className="hero-content" style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <FontAwesomeIcon 
              icon={faSchool} 
              className="mb-5" 
              style={{ 
                fontSize: '7rem', 
                color: 'var(--accent-color)',
                opacity: 0.9,
                filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))',
                textShadow: '0 0 40px rgba(76, 175, 80, 0.8)'
              }} 
            />
            <h1 className="display-1 fw-bold mb-4" style={{ 
              color: 'var(--text-light)',
              fontSize: '5rem',
              fontWeight: '800',
              lineHeight: '1.1',
              textShadow: '0 4px 12px rgba(27, 94, 32, 0.6)',
              marginBottom: 'var(--spacing-xl)'
            }}>
              Pagbilao National High School
            </h1>
            <p className="lead mb-5" style={{ 
              fontSize: '1.5rem',
              color: 'rgba(255, 255, 255, 0.98)',
              fontWeight: '400',
              maxWidth: '800px',
              margin: '0 auto var(--spacing-2xl) auto',
              lineHeight: '1.7'
            }}>
              Navigate your campus with confidence using our smart digital guide
            </p>
            
            {/* Quick Search with Green Theme */}
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <div className="search-container">
                <div className="search-box" style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(15px)',
                  border: '2px solid rgba(76, 175, 80, 0.6)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--spacing-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing)',
                  boxShadow: '0 8px 32px rgba(56, 142, 60, 0.4)'
                }}>
                  <FontAwesomeIcon 
                    icon={faSearch} 
                    style={{ 
                      color: 'var(--accent-color)',
                      fontSize: '1.5rem',
                      opacity: 0.9
                    }} 
                  />
                  <input
                    type="text"
                    placeholder="Search locations, directions, or ask our assistant..."
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: 'var(--text-light)',
                      fontSize: '1.125rem',
                      outline: 'none'
                    }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={(e) => {
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }}
                    onBlur={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  />
                  <button
                    style={{
                      background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 100%)',
                      border: 'none',
                      color: 'var(--text-light)',
                      padding: 'var(--spacing-sm) var(--spacing-xl)',
                      borderRadius: 'var(--radius-lg)',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontSize: '1.125rem',
                      boxShadow: '0 4px 16px rgba(76, 175, 80, 0.5)',
                      textShadow: '0 1px 2px rgba(27, 94, 32, 0.4)'
                    }}
                    onClick={handleQuickAsk}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(76, 175, 80, 0.7)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 100%)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(76, 175, 80, 0.5)';
                    }}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Navigation Cards */}
      <Container className="py-5" style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--section-padding) var(--container-padding)' }}>
        <Row className="g-5 align-items-stretch" style={{ marginBottom: 'var(--spacing-xl)' }}>
          <Col xs={12} md={4}>
            <Card className="h-100 text-center border-0 shadow-xl modern-card" style={{ padding: 'var(--card-padding)' }}>
              <div className="text-center mb-4">
                <div className="icon-wrapper" style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(76, 175, 80, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--spacing-lg) auto',
                  transition: 'all 0.3s ease'
                }}>
                  <FontAwesomeIcon 
                    icon={faComments} 
                    style={{ fontSize: '2.5rem', color: 'var(--primary-color)' }}
                  />
                </div>
              </div>
              <Card.Title className="mb-4 fw-bold" style={{ color: 'var(--text-primary)', fontSize: '1.5rem' }}>
                Chat Assistant
              </Card.Title>
              <Card.Text className="mb-5 flex-grow-1" style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: '1.7' }}>
                Ask questions about locations, directions, and facilities with our AI-powered assistant
              </Card.Text>
              <div className="mt-auto">
                <Button 
                  variant="primary"
                  onClick={handleChatScroll}
                  className="w-100 chat-button"
                >
                  Chat Now
                </Button>
              </div>
            </Card>
          </Col>
          
          <Col xs={12} md={4}>
            <Card className="h-100 text-center border-0 shadow-xl modern-card" style={{ padding: 'var(--card-padding)' }}>
              <div className="text-center mb-4">
                <div className="icon-wrapper" style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(56, 142, 60, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--spacing-lg) auto',
                  transition: 'all 0.3s ease'
                }}>
                  <FontAwesomeIcon 
                    icon={faRoute} 
                    style={{ fontSize: '2.5rem', color: 'var(--primary-dark)' }}
                  />
                </div>
              </div>
              <Card.Title className="mb-4 fw-bold" style={{ color: 'var(--text-primary)', fontSize: '1.5rem' }}>
                Get Directions
              </Card.Title>
              <Card.Text className="mb-5 flex-grow-1" style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: '1.7' }}>
                Step-by-step navigation between any campus locations with real-time routing
              </Card.Text>
              <div className="mt-auto">
                <Button 
                  variant="primary"
                  onClick={() => {
                    const directionsElement = document.getElementById('directions');
                    directionsElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-100"
                  style={{ 
                    backgroundColor: 'var(--primary-dark)',
                    borderColor: 'var(--primary-dark)',
                    padding: 'var(--spacing-sm) var(--spacing-lg)',
                    fontWeight: '600',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Navigate
                </Button>
              </div>
            </Card>
          </Col>
          
          <Col xs={12} md={4}>
            <Card className="h-100 text-center border-0 shadow-xl modern-card" style={{ padding: 'var(--card-padding)' }}>
              <div className="text-center mb-4">
                <div className="icon-wrapper" style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(129, 199, 132, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--spacing-lg) auto',
                  transition: 'all 0.3s ease'
                }}>
                  <FontAwesomeIcon 
                    icon={faMapMarkedAlt} 
                    style={{ fontSize: '2.5rem', color: 'var(--accent-color)' }}
                  />
                </div>
              </div>
              <Card.Title className="mb-4 fw-bold" style={{ color: 'var(--text-primary)', fontSize: '1.5rem' }}>
                Browse Locations
              </Card.Title>
              <Card.Text className="mb-5 flex-grow-1" style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: '1.7' }}>
                Explore all buildings, facilities, and areas on campus with detailed information
              </Card.Text>
              <div className="mt-auto">
                <Button 
                  variant="primary"
                  onClick={() => {
                    const locationsElement = document.getElementById('locations');
                    locationsElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-100"
                  style={{ 
                    backgroundColor: 'var(--primary-color)',
                    borderColor: 'var(--primary-color)',
                    padding: 'var(--spacing-sm) var(--spacing-lg)',
                    fontWeight: '600',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
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
