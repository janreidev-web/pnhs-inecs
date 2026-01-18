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

  const isButtonDisabled: boolean = Boolean(isTyping || !inputText.trim());
  const buttonIcon = isTyping ? (
    <FontAwesomeIcon icon={faSpinner} spin />
  ) : (
    <FontAwesomeIcon icon={faPaperPlane} />
  );

  return (
    <Container className="py-3 py-md-5" id="chat">
      <Row className="justify-content-center">
        <Col xs={12} lg={10} xl={8}>
          <h2 className="text-center mb-3 mb-md-4 chat-header" style={{ color: 'var(--primary-green)' }}>
            <FontAwesomeIcon icon={faComments} className="me-2" />
            Ask Your Campus Assistant
          </h2>
          
          <Card className="shadow-sm chat-interface" style={{ height: '500px' }}>
            <div 
              className="d-flex flex-column h-100"
              style={{ backgroundColor: '#f8f9fa', borderRadius: '0.375rem' }}
            >
              <div 
                className="flex-grow-1 overflow-auto p-2 p-md-3 chat-messages-container"
                style={{ minHeight: 0 }}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-2 mb-md-3 ${message.sender === 'user' ? 'text-end' : 'text-start'}`}
                  >
                    <div
                      className={`d-inline-block p-2 p-md-3 rounded-3 chat-message ${
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
                        <strong className="d-block mb-1 mb-md-2 chat-bot-label" style={{ color: 'var(--primary-green)' }}>
                          Campus Assistant:
                        </strong>
                      )}
                      <div className="chat-message-text" style={{ whiteSpace: 'pre-line' }}>
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
              
              <div className="border-top p-2 p-md-3 bg-white chat-input-container">
                <Form onSubmit={handleSubmit}>
                  <div className="d-flex gap-2">
                    <Form.Control
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type your question..."
                      disabled={isTyping}
                      className="border-0 shadow-sm chat-input"
                    />
                    {/* @ts-expect-error - TypeScript union type complexity with react-bootstrap Button and React 19 */}
                    <Button 
                      type="submit" 
                      variant="primary"
                      disabled={isButtonDisabled}
                      className="px-3 px-md-4 chat-send-button"
                      aria-label={isTyping ? "Sending message" : "Send message"}
                    >
                      {buttonIcon}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      
      {/* Hints Dropdown */}
      <Row className="justify-content-center mt-2 mt-md-3">
        <Col xs={12} lg={10} xl={8}>
          <Dropdown show={showHints} onToggle={setShowHints}>
            <Dropdown.Toggle variant="outline-primary" className="w-100 chat-hints-toggle" style={{ borderColor: 'var(--primary-green)', color: 'var(--primary-green)' }}>
              <FontAwesomeIcon icon={faChevronDown} className="me-2" />
              What can I ask?
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100 chat-hints-menu">
              <Dropdown.Header className="chat-hints-header" style={{ backgroundColor: 'var(--background-green)', color: 'var(--primary-green)' }}>
                <strong>💡 Try these examples:</strong>
              </Dropdown.Header>
              <Dropdown.Item className="chat-hints-item" onClick={() => { setInputText("Where is the library?"); setShowHints(false); }}>
                📍 "Where is the library?"
              </Dropdown.Item>
              <Dropdown.Item className="chat-hints-item" onClick={() => { setInputText("Who teaches science?"); setShowHints(false); }}>
                👥 "Who teaches science?"
              </Dropdown.Item>
              <Dropdown.Item className="chat-hints-item" onClick={() => { setInputText("How do I get to the covered court?"); setShowHints(false); }}>
                🧭 "How do I get to the covered court?"
              </Dropdown.Item>
              <Dropdown.Item className="chat-hints-item" onClick={() => { setInputText("What are the school hours?"); setShowHints(false); }}>
                ℹ️ "What are the school hours?"
              </Dropdown.Item>
              <Dropdown.Item className="chat-hints-item" onClick={() => { setInputText("Where is Mr. Santos?"); setShowHints(false); }}>
                🏫 "Where is Mr. Santos?"
              </Dropdown.Item>
              <Dropdown.Item className="chat-hints-item" onClick={() => { setInputText("What facilities are available?"); setShowHints(false); }}>
                🏫 "What facilities are available?"
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="chat-hints-item" onClick={() => { setInputText("help"); setShowHints(false); }}>
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
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .chat-interface {
            height: calc(100vh - 280px) !important;
            min-height: 350px !important;
            max-height: 500px !important;
          }
          
          .chat-header {
            font-size: 1.25rem !important;
            margin-bottom: 1rem !important;
          }
          
          .chat-header .fa-comments {
            font-size: 1.1rem !important;
          }
          
          .chat-messages-container {
            padding: 0.75rem !important;
          }
          
          .chat-message {
            font-size: 0.9rem !important;
            max-width: 90% !important;
            padding: 0.75rem !important;
            line-height: 1.4 !important;
          }
          
          .chat-bot-label {
            font-size: 0.85rem !important;
            margin-bottom: 0.25rem !important;
          }
          
          .chat-message-text {
            font-size: 0.9rem !important;
            line-height: 1.4 !important;
          }
          
          .chat-input-container {
            padding: 0.75rem !important;
          }
          
          .chat-input {
            font-size: 16px !important; /* Prevents zoom on iOS */
          }
          
          .chat-send-button {
            min-width: 44px !important;
            padding: 0.5rem 0.75rem !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          
          .chat-send-button svg {
            font-size: 1rem !important;
          }
          
          .chat-hints-toggle {
            padding: 0.75rem !important;
            font-size: 0.9rem !important;
            min-height: 44px !important;
          }
          
          .chat-hints-menu {
            max-height: 60vh !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
          }
          
          .chat-hints-item {
            padding: 0.75rem 1rem !important;
            font-size: 0.9rem !important;
            min-height: 44px !important;
            display: flex !important;
            align-items: center !important;
          }
          
          .chat-hints-header {
            padding: 0.75rem 1rem !important;
            font-size: 0.85rem !important;
          }
        }
        
        /* Small mobile devices */
        @media (max-width: 576px) {
          .chat-interface {
            height: calc(100vh - 250px) !important;
            min-height: 320px !important;
          }
          
          .chat-header {
            font-size: 1.1rem !important;
            margin-bottom: 0.75rem !important;
          }
          
          .chat-message {
            max-width: 92% !important;
            padding: 0.625rem !important;
            font-size: 0.85rem !important;
          }
          
          .chat-bot-label {
            font-size: 0.8rem !important;
          }
          
          .chat-message-text {
            font-size: 0.85rem !important;
          }
        }
        
        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .chat-hints-item:hover {
            background-color: var(--bs-dropdown-link-hover-bg) !important;
          }
          
          .chat-send-button:active {
            transform: scale(0.95) !important;
            transition: transform 0.1s ease !important;
          }
          
          .chat-message {
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
          }
        }
        
        /* Landscape mobile */
        @media (max-width: 768px) and (orientation: landscape) {
          .chat-interface {
            height: calc(100vh - 200px) !important;
            min-height: 300px !important;
          }
        }
      `}</style>
    </Container>
  );
};

export default ChatAssistant;
