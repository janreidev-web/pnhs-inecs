import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute, faClock, faWalking, faExclamationTriangle, faMapMarkerAlt, faLocationArrow, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { useDirections } from '../hooks/useDirections';
import { googleMapsService } from '../services/googleMapsService';
import { schoolData } from '../data/schoolData';

const Directions: React.FC = () => {
  const {
    from,
    to,
    directions,
    isLoading,
    error,
    setFrom,
    setTo,
    getDirections
  } = useDirections();

  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const [showMap, setShowMap] = useState(true); // Show map by default

  // Set default destination to PNHS
  React.useEffect(() => {
    if (!to.trim()) {
      setTo('Pagbilao National High School');
    }
  }, [to, setTo]);

  // Don't auto-detect current location on component mount - let user type manually

  const handleGetDirections = (e: React.FormEvent) => {
    e.preventDefault();
    if (from.trim() && to.trim()) {
      getDirections(from.trim(), to.trim());
      setShowMap(true);
    }
  };

  const handleUseCurrentLocation = async () => {
    try {
      const location = await googleMapsService.getCurrentLocation();
      setCurrentLocation(location);
      setFrom('My Current Location');
      setLocationError('');
    } catch (error) {
      setLocationError('Unable to get your current location. Please enable location services.');
    }
  };

  const openGoogleMaps = () => {
    const destination = to || `${schoolData.schoolInfo.name}, ${schoolData.schoolInfo.address}`;
    const directionsUrl = googleMapsService.regenerateDirectionsUrl(destination);
    window.open(directionsUrl, '_blank');
  };

  const getEmbedMapUrl = () => {
    const destination = to || `${schoolData.schoolInfo.name}, ${schoolData.schoolInfo.address}`;
    const origin = from.trim() || undefined;
    return googleMapsService.generateEmbedMapUrl(destination, origin);
  };

  return (
    <Container className="py-5" id="directions">
      <Row className="justify-content-center">
        <Col xs={12} lg={10} xl={8}>
          <h2 className="text-center mb-4" style={{ color: 'var(--primary-green)' }}>
            <FontAwesomeIcon icon={faRoute} className="me-2" />
            Get Directions
          </h2>
          
          <Card className="shadow-sm">
            <Card.Body className="p-3 p-md-4">
              <Form onSubmit={handleGetDirections}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: 'var(--primary-green)', fontWeight: '500' }}>From:</Form.Label>
                  <div className="d-flex gap-2">
                    <Form.Control
                      type="text"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      placeholder="Enter your current location"
                      required
                      className="border-0 shadow-sm"
                    />
                    <Button 
                      variant="outline-primary" 
                      onClick={handleUseCurrentLocation}
                      title="Use my current location"
                      style={{ borderColor: 'var(--primary-green)', color: 'var(--primary-green)' }}
                    >
                      <FontAwesomeIcon icon={faLocationArrow} />
                    </Button>
                  </div>
                  {locationError && (
                    <small className="text-danger">{locationError}</small>
                  )}
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ color: 'var(--primary-green)', fontWeight: '500' }}>To:</Form.Label>
                  <Form.Control
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="Where do you want to go?"
                    required
                    className="border-0 shadow-sm"
                  />
                </Form.Group>

                <div className="text-center mb-3">
                  <Button type="submit" variant="primary" size="lg" disabled={isLoading} className="px-4 me-2">
                    <FontAwesomeIcon icon={faRoute} className="me-2" />
                    {isLoading ? 'Finding Route...' : 'Get Directions'}
                  </Button>
                  <Button 
                    variant="success" 
                    onClick={openGoogleMaps}
                    className="px-4"
                    style={{ backgroundColor: 'var(--contrast-orange)', borderColor: 'var(--contrast-orange)' }}
                  >
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="me-2" />
                    Open Google Maps
                  </Button>
                </div>
              </Form>

              {/* Google Maps Embed - Always Visible */}
              <Card className="mt-4" style={{ marginTop: '2rem !important' }}>
                <Card.Header className="bg-light">
                  <h5 className="mb-0">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                    {googleMapsService.isConfigured() ? 'PNHS Location Map' : 'PNHS Location'}
                  </h5>
                </Card.Header>
                <Card.Body className="p-0">
                  {googleMapsService.isConfigured() ? (
                    <iframe
                      src={getEmbedMapUrl()}
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title="PNHS Location Map"
                    />
                  ) : (
                    <div className="text-center p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
                      <FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: '3rem', color: 'var(--primary-green)', marginBottom: '0.5rem' }} />
                      <h4>Google Maps</h4>
                      <p className="text-muted mb-0">Location: {to || schoolData.schoolInfo.name}</p>
                      <Button 
                        variant="primary"
                        onClick={openGoogleMaps}
                        className="px-4"
                        style={{ backgroundColor: 'var(--contrast-blue)', borderColor: 'var(--contrast-blue)' }}
                      >
                        <FontAwesomeIcon icon={faExternalLinkAlt} className="me-2" />
                        Open in Google Maps
                      </Button>
                    </div>
                  )}
                </Card.Body>
                <Card.Footer className="bg-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" />
                      {to || schoolData.schoolInfo.name}, {schoolData.schoolInfo.address}
                    </small>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={openGoogleMaps}
                      style={{ borderColor: 'var(--primary-green)', color: 'var(--primary-green)' }}
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} className="me-1" />
                      Open in Google Maps
                    </Button>
                  </div>
                </Card.Footer>
              </Card>

              {isLoading && (
                <div className="text-center mt-4">
                  <Spinner animation="border" style={{ color: 'var(--primary-green)' }} />
                  <p className="mt-2">Finding your route...</p>
                </div>
              )}

              {directions && (
                <Alert variant="success" className="mt-4" style={{ backgroundColor: 'var(--background-green)', borderColor: 'var(--light-green)', color: 'var(--dark-green)' }}>
                  <Alert.Heading style={{ color: 'var(--primary-green)' }}>
                    <FontAwesomeIcon icon={faRoute} className="me-2" />
                    Directions Found!
                  </Alert.Heading>
                  <p className="mb-2">
                    <strong>From:</strong> {from}
                  </p>
                  <p className="mb-2">
                    <strong>To:</strong> {to}
                  </p>
                  <p className="mb-3">
                    <strong>Instructions:</strong> {directions}
                  </p>
                  <div className="d-flex flex-wrap gap-3">
                    <small style={{ color: 'var(--dark-green)' }}>
                      <FontAwesomeIcon icon={faClock} className="me-1" />
                      Estimated time: 2-5 minutes
                    </small>
                    <small style={{ color: 'var(--dark-green)' }}>
                      <FontAwesomeIcon icon={faWalking} className="me-1" />
                      Walking distance
                    </small>
                  </div>
                </Alert>
              )}

              {error && (
                <Alert variant="danger" className="mt-4">
                  <Alert.Heading>
                    <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
                    Directions Not Found
                  </Alert.Heading>
                  <p>{error}</p>
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Directions;
