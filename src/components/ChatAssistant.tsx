import React, { useState} from 'react';
import { Container, Row, Col, Card, Form, Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faPaperPlane, faSpinner, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useChatBot } from '../hooks/useChatBot';

const ChatAssistant: React.FC = () => {
  const { messages, isTyping, showHints, setShowHints, sendMessage } = useChatBot();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      await sendMessage(inputText.trim());
      setInputText('');
    }
  };
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Container className="py-5" id="chat">
      <Row className="justify-content-center">
        <Col xs={12} lg={10} xl={8}>
          <h2 className="text-center mb-4" style={{ color: 'var(--primary-green)' }}>
            <FontAwesomeIcon icon={faComments} className="me-2" />
            Ask Your Campus Assistant
          </h2>
          
          <Card className="shadow-sm chat-interface" style={{ height: '500px' }}>
            <div 
              className="d-flex flex-column h-100"
              style={{ backgroundColor: '#f8f9fa', borderRadius: '0.375rem' }}
            >
              <div 
                className="flex-grow-1 overflow-auto p-3"
                style={{ minHeight: 0 }}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-3 ${message.sender === 'user' ? 'text-end' : 'text-start'}`}
                  >
                    <div
                      className={`d-inline-block p-3 rounded-3 ${
                        message.sender === 'user'
                          ? 'text-white'
                          : 'bg-white text-dark border'
                      }`}
                      style={{ 
                        maxWidth: '85%',
                        backgroundColor: message.sender === 'user' ? 'var(--primary-green)' : 'white',
                        border: message.sender === 'bot' ? '1px solid var(--light-green)' : 'none'
                      }}
                    >
                      {message.sender === 'bot' && (
                        <strong className="d-block mb-1" style={{ color: 'var(--primary-green)' }}>
                          Campus Assistant:
                        </strong>
                      )}
                      <div style={{ whiteSpace: 'pre-line' }}>
                        {message.text}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="d-flex gap-1 p-2 align-items-center">
                    <div 
                      className="rounded-circle"
                      style={{ 
                        width: '8px', 
                        height: '8px', 
                        animation: 'typing 1.4s infinite',
                        backgroundColor: 'var(--primary-green)'
                      }}
                    />
                    <div 
                      className="rounded-circle"
                      style={{ 
                        width: '8px', 
                        height: '8px', 
                        animation: 'typing 1.4s infinite 0.2s',
                        backgroundColor: 'var(--primary-green)'
                      }}
                    />
                    <div 
                      className="rounded-circle"
                      style={{ 
                        width: '8px', 
                        height: '8px', 
                        animation: 'typing 1.4s infinite 0.4s',
                        backgroundColor: 'var(--primary-green)'
                      }}
                    />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="border-top p-3 bg-white">
                <Form onSubmit={handleSubmit}>
                  <div className="d-flex gap-2">
                    <Form.Control
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type your question..."
                      disabled={isTyping}
                      className="border-0 shadow-sm"
                    />
                    <Button 
                      type="submit" 
                      variant="primary"
                      disabled={isTyping || !inputText.trim()}
                      className="px-3"
                    >
                      {isTyping ? (
                        <FontAwesomeIcon icon={faSpinner} spin />
                      ) : (
                        <FontAwesomeIcon icon={faPaperPlane} />
                      )}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      
      {/* Hints Dropdown */}
      <Row className="justify-content-center mt-3">
        <Col xs={12} lg={10} xl={8}>
          <Dropdown show={showHints} onToggle={setShowHints}>
            <Dropdown.Toggle variant="outline-primary" className="w-100" style={{ borderColor: 'var(--primary-green)', color: 'var(--primary-green)' }}>
              <FontAwesomeIcon icon={faChevronDown} className="me-2" />
              What can I ask?
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              <Dropdown.Header style={{ backgroundColor: 'var(--background-green)', color: 'var(--primary-green)' }}>
                <strong>💡 Try these examples:</strong>
              </Dropdown.Header>
              <Dropdown.Item onClick={() => { setInputText("Where is the library?"); setShowHints(false); }}>
                📍 "Where is the library?"
              </Dropdown.Item>
              <Dropdown.Item onClick={() => { setInputText("Who teaches science?"); setShowHints(false); }}>
                👥 "Who teaches science?"
              </Dropdown.Item>
              <Dropdown.Item onClick={() => { setInputText("How do I get to the covered court?"); setShowHints(false); }}>
                🧭 "How do I get to the covered court?"
              </Dropdown.Item>
              <Dropdown.Item onClick={() => { setInputText("What are the school hours?"); setShowHints(false); }}>
                ℹ️ "What are the school hours?"
              </Dropdown.Item>
              <Dropdown.Item onClick={() => { setInputText("Where is Mr. Santos?"); setShowHints(false); }}>
                🏫 "Where is Mr. Santos?"
              </Dropdown.Item>
              <Dropdown.Item onClick={() => { setInputText("What facilities are available?"); setShowHints(false); }}>
                🏫 "What facilities are available?"
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => { setInputText("help"); setShowHints(false); }}>
                💬 "help" - See all capabilities
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      
      <style>{`
        @keyframes typing {
          0%, 60%, 100% { opacity: 0.3; }
          30% { opacity: 1; }
        }
        
        @media (max-width: 768px) {
          .chat-interface {
            height: 400px !important;
          }
          
          .message {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </Container>
  );
};

export default ChatAssistant;
