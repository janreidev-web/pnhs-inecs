// Google Maps Service for real-time directions
declare global {
  interface Window {
    google: any;
  }
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const googleMapsService = {
  isConfigured(): boolean {
    return !!GOOGLE_MAPS_API_KEY;
  },

  getApiKey(): string {
    return GOOGLE_MAPS_API_KEY || '';
  },

  regenerateDirectionsUrl(destination: string, origin?: string): string {
    if (origin) {
      return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
  },

  generateEmbedMapUrl(destination: string, origin?: string): string {
    if (!GOOGLE_MAPS_API_KEY) {
      // Fallback to a simple iframe without Google Maps embed
      // This will show a basic map placeholder
      return `data:text/html,<html><body><h2>Google Maps</h2><p>Location: ${destination}</p><p><a href="https://www.google.com/maps/search/?api=1&q=${encodeURIComponent(destination)}" target="_blank">Open in Google Maps</a></p></body></html>`;
    }

    // If API key is available, use Google Maps embed with directions
    if (origin) {
      // Show directions route
      return `https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_MAPS_API_KEY}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&zoom=16&maptype=roadmap&language=en&avoid=tolls|ferries`;
    } else {
      // Show single location
      return `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(destination)}&zoom=16&maptype=roadmap&language=en`;
    }
  },

  async getCurrentLocation(): Promise<{ lat: number; lng: number } | null> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  },

}
