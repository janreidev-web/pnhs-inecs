import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import ChatAssistant from './components/ChatAssistant';
import Directions from './components/Directions';
import Locations from './components/Locations';
import Footer from './components/Footer';
import SchoolMap3D from './components/SchoolMap3D';

function App() {
  useEffect(() => {
    // Focus on hero section when page loads/refreshes
    const handlePageLoad = () => {
      const homeElement = document.getElementById('home');
      if (homeElement) {
        const offset = 76; // Account for fixed navbar height
        const elementPosition = homeElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'auto' // Use auto for instant scroll on page load
        });
      }
    };

    // Handle initial page load
    handlePageLoad();

    // Handle browser back/forward navigation
    window.addEventListener('popstate', handlePageLoad);

    return () => {
      window.removeEventListener('popstate', handlePageLoad);
    };
  }, []);

  return (
    <div className="App">
      <Navigation />
      <main>
        <Home />
        <section id="3d-map" style={{ 
          padding: '80px 0',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)'
        }}>
          <div className="container">
            <div className="text-center mb-5">
              <h2 style={{ 
                fontSize: '2.5rem', 
                fontWeight: '700', 
                color: '#1B5E20',
                marginBottom: '1rem'
              }}>
                3D Campus Map
              </h2>
              <p style={{ 
                fontSize: '1.2rem', 
                color: '#666',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Explore Pagbilao National High School in interactive 3D. 
                Rotate, zoom, and pan to discover every corner of our campus.
              </p>
            </div>
            <SchoolMap3D height="600px" showControls={true} />
          </div>
        </section>
        <ChatAssistant />
        <Directions />
        <Locations />
      </main>
      <Footer />
    </div>
  );
}

export default App;
