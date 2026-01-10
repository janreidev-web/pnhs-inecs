# Pagbilao National High School - Campus Guide (Mobile-Optimized React App)

A modern, mobile-first React application for navigating Pagbilao National High School campus with an interactive assistant.

## 🌟 Features

- 💬 **Interactive Chat Assistant** - Ask questions about locations, directions, and facilities
- 🧭 **Smart Navigation** - Get step-by-step directions between locations
- 🔍 **Location Search** - Quick search for buildings and facilities
- 🗺️ **Google Maps Integration** - Real-time directions and embedded maps
- 👥 **Faculty & Staff Search** - Find teachers and their locations
- 📱 **Mobile-First Design** - Fully optimized for smartphones and tablets
- ⚡ **Modern React** - Built with Vite, TypeScript, and Bootstrap 5
- 🤖 **AI-Powered** - Gemini API for intelligent conversations
- 🎯 **Touch-Friendly** - Optimized for touch interactions and mobile UX

## 📱 Mobile Features

- **Responsive Design** - Adapts perfectly to all screen sizes
- **Touch Targets** - 44px minimum touch targets for iOS compliance
- **Mobile Navigation** - Collapsible navbar with mobile-optimized menu
- **Chat Interface** - Mobile-optimized chat with proper scrolling
- **Gesture Support** - Touch feedback and smooth animations
- **Performance** - Fast loading and smooth interactions

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- (Optional) Gemini API key for enhanced AI responses

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up Gemini API (Optional but Recommended)**
   
   For enhanced AI-powered responses, get a free Gemini API key:
   
   a. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   b. Create a new API key
   c. Add to your `.env` file:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Set up Google Maps API (Optional but Recommended)**
   
   For real-time directions and maps integration:
   
   a. Visit [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   b. Enable Google Maps JavaScript API and Geocoding API
   c. Create an API key
   d. Add to your `.env` file:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_actual_google_maps_api_key_here
   ```
   
   **Note:** The app will work without API keys using rule-based responses and basic Google Maps links, but the APIs provide enhanced functionality.

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 📱 Mobile Testing

### Test on Different Devices
- **Smartphones**: 320px - 768px
- **Tablets**: 768px - 1024px  
- **Desktop**: 1024px+

### Mobile Features
- ✅ Responsive typography
- ✅ Touch-friendly buttons (44px min)
- ✅ Mobile-optimized navigation
- ✅ Proper viewport meta tag
- ✅ Smooth scrolling
- ✅ Touch feedback animations

## 📍 Available Locations

- **Gates**: Gate 1, Gate 2
- **Academic**: DepEd Building 4, Proposed 2-Storey Building
- **Sports**: Covered Court, Open Court
- **Support**: Car Park, Gulayan sa Paaralan Area

## 💬 Sample Questions

- "Where is the library?"
- "How do I get to the covered court?"
- "What facilities are available?"
- "What are the school hours?"
- "Where is the canteen?"

## 🌐 Deployment

### GitHub Pages

1. Update `package.json` homepage field:
   ```json
   "homepage": "https://[username].github.io/[repository-name]"
   ```

2. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```

### Netlify/Vercel

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Static Hosting

Upload the `dist` folder to any static hosting service.

## 🛠️ Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **UI Framework**: Bootstrap 5.3
- **Icons**: Font Awesome 7
- **State Management**: React Hooks
- **Mobile Optimization**: CSS Media Queries, Touch Events

## 📱 Mobile Optimization Details

### Responsive Breakpoints
```css
/* Mobile phones */
@media (max-width: 768px) { ... }

/* Small tablets */
@media (max-width: 576px) { ... }

/* Touch devices */
@media (hover: none) { ... }
```

### Touch Improvements
- Minimum 44px touch targets
- Touch feedback animations
- Proper spacing between interactive elements
- Mobile-optimized form inputs

### Performance
- Lazy loading components
- Optimized images and icons
- Smooth scrolling behavior
- Reduced motion support

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Home.tsx        # Homepage (mobile-optimized)
│   ├── ChatAssistant.tsx # Chat interface (mobile-friendly)
│   ├── Directions.tsx  # Directions form (responsive)
│   ├── Locations.tsx   # Location cards (touch-friendly)
│   ├── Navigation.tsx  # Mobile navigation
│   └── Footer.tsx      # Footer
├── hooks/              # Custom React hooks
│   ├── useChatBot.ts   # Chat functionality
│   └── useDirections.ts # Directions logic
├── data/               # Static data
│   └── schoolData.ts   # School information
├── types/              # TypeScript types
│   └── index.ts        # Type definitions
└── App.tsx            # Main application
```

## 🔧 Customization

To add new locations or modify existing ones:

1. Open `src/data/schoolData.ts`
2. Add or modify locations in the `locations` array
3. Update directions in the `directions` object
4. Add quick routes in the `quickRoutes` object

## 📱 Mobile Features

### Chat Assistant
- Mobile-optimized keyboard handling
- Touch-friendly message bubbles
- Proper scrolling on small screens
- Typing indicators optimized for mobile

### Directions System
- Large touch targets for form inputs
- Mobile-friendly button sizes
- Responsive result display
- Touch-optimized navigation

### Location Browser
- Swipe-friendly cards
- Touch feedback on interaction
- Mobile-optimized grid layout
- Quick navigation to directions

## 🎯 Use Cases

- **New Students**: Learn the campus layout on their phones
- **Visitors**: Navigate using mobile devices
- **Staff**: Quick location lookup on mobile
- **Events**: Guide participants using smartphones

## 📄 License

Open source and available under the MIT License.

---

**Mobile-First, Touch-Friendly, and Always Accessible** - Built for the modern mobile web!
