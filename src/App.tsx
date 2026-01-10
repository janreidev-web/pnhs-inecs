import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import ChatAssistant from './components/ChatAssistant';
import Directions from './components/Directions';
import Locations from './components/Locations';
import Footer from './components/Footer';

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
        <ChatAssistant />
        <Directions />
        <Locations />
      </main>
      <Footer />
    </div>
  );
}

export default App;
