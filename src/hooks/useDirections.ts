import { useState } from 'react';
import { schoolData } from '../data/schoolData';
import { googleMapsService } from '../services/googleMapsService';

export const useDirections = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [directions, setDirections] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDirections = async (fromLocation: string, toLocation: string) => {
    setIsLoading(true);
    setError(null);
    setDirections(null);

    try {
      // First try Google Maps API if available
      if (googleMapsService.isConfigured()) {
        try {
          // Generate Google Maps directions URL
          const directionsUrl = googleMapsService.regenerateDirectionsUrl(toLocation, fromLocation);
          
          // Create a user-friendly response with Google Maps link
          const googleMapsResponse = `🗺️ **Google Directions Available**\n\n📍 **From:** ${fromLocation}\n🎯 **To:** ${toLocation}\n\n📱 **Get turn-by-turn directions:**\n[Open in Google Maps](${directionsUrl})\n\n🚗 **Directions include:**\n• Real-time traffic updates\n• Multiple route options\n• Turn-by-turn navigation\n• Estimated travel time\n• Distance calculation\n\n💡 **Tip:** Click the link above for the best navigation experience with live traffic and voice guidance!`;
          
          setDirections(googleMapsResponse);
          return;
        } catch (googleError) {
          console.log('Google Maps API failed, using fallback:', googleError);
        }
      }

      // Fallback to static directions from school data
      const fromKey = fromLocation.toLowerCase().replace(/\s+/g, '_');
      const toKey = toLocation.toLowerCase().replace(/\s+/g, '_');
      const directionKey = `${fromKey}_to_${toKey}`;

      let instructions = schoolData.directions[directionKey];

      if (!instructions) {
        // Try reverse direction
        const reverseKey = `${toKey}_to_${fromKey}`;
        if (schoolData.directions[reverseKey]) {
          instructions = schoolData.directions[reverseKey]
            .replace(/From (\w+)/, 'To $1')
            .replace(/to reach/, 'from');
        }
      }

      if (instructions) {
        // Enhance the response with Google Maps link
        const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(fromLocation)}&destination=${encodeURIComponent(toLocation)}`;
        const enhancedResponse = `🧭 **Directions Found**\n\n${instructions}\n\n📱 **For detailed navigation:**\n[View in Google Maps](${directionsUrl})\n\n💡 **Get turn-by-turn directions, real-time traffic, and voice navigation by clicking the link above!`;
        setDirections(enhancedResponse);
      } else {
        // Even if no specific directions found, still provide Google Maps link
        const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(fromLocation)}&destination=${encodeURIComponent(toLocation)}`;
        const fallbackResponse = `🗺️ **Google Maps Navigation**\n\n📍 **From:** ${fromLocation}\n🎯 **To:** ${toLocation}\n\n📱 **Get directions:**\n[Open in Google Maps](${directionsUrl})\n\n💡 **Google Maps will provide the best route with real-time traffic and turn-by-turn directions!`;
        setDirections(fallbackResponse);
      }
    } catch (err) {
      setError('An error occurred while getting directions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setFrom('');
    setTo('');
    setDirections(null);
    setError(null);
  };

  return {
    from,
    to,
    directions,
    isLoading,
    error,
    setFrom,
    setTo,
    getDirections,
    reset
  };
};
