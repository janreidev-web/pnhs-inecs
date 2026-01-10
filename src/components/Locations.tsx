import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { schoolData } from '../data/schoolData';
import { useDirections } from '../hooks/useDirections';

const Locations: React.FC = () => {
  const { setTo } = useDirections();

  const handleLocationClick = (locationName: string) => {
    setTo(locationName);
    // Scroll to directions section
    const directionsElement = document.getElementById('directions');
    directionsElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      entrance: 'primary',
      academic: 'success',
      sports: 'info',
      parking: 'warning',
      garden: 'success',
      road: 'secondary'
    };
    return colors[type] || 'primary';
  };

  return (
    <Container className="py-5" id="locations">
      <Row>
        <Col>
          <h2 className="text-center mb-4" style={{ color: 'var(--primary-green)' }}>
            <FontAwesomeIcon icon={faMapMarkedAlt} className="me-2" />
            School Locations
          </h2>
          
          <Row className="g-4">
            {schoolData.locations.map((location) => (
              <Col key={location.id} xs={12} sm={6} md={4}>
                <Card 
                  className="h-100 shadow-sm location-card"
                  onClick={() => handleLocationClick(location.name)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Body className="d-flex flex-column p-3">
                    <Card.Title className="d-flex align-items-center">
                      <span className="me-2" style={{ fontSize: '1.5rem' }}>
                        {location.icon}
                      </span>
                      <span className="fs-6">{location.name}</span>
                    </Card.Title>
                    
                    <Card.Text className="flex-grow-1 small">
                      {location.description}
                    </Card.Text>
                    
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <Badge bg={getTypeColor(location.type)} className="fs-6">
                        {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
                      </Badge>
                      {location.status === 'proposed' && (
                        <Badge bg="warning" className="fs-6">Proposed</Badge>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Locations;
