import { useState } from 'react';
import type { ChatMessage } from '../types';
import { schoolData } from '../data/schoolData';
import { geminiService } from '../services/geminiService';

export const useChatBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm here to help you navigate Pagbilao National High School. Ask me anything about locations, directions, faculty, or school information!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const generateHints = (): string => {
    const hints = [
      "💡 **Try asking:** \"Where is the library?\" or \"Who teaches math?\"",
      "💡 **Try asking:** \"How do I get to the covered court?\" or \"Where is Mr. Santos?\"",
      "💡 **Try asking:** \"What facilities are available?\" or \"When is the principal available?\"",
      "💡 **Try asking:** \"Who is the science teacher?\" or \"Where can I find the guidance counselor?\"",
      "💡 **Try asking:** \"What are the school hours?\" or \"Where is the canteen?\""
    ];
    return hints[Math.floor(Math.random() * hints.length)];
  };

  const findFaculty = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    // Search by name
    let matches = schoolData.faculty.filter(faculty => 
      faculty.name.toLowerCase().includes(lowerQuery)
    );
    
    // If no name matches, search by department/position
    if (matches.length === 0) {
      if (lowerQuery.includes('principal') || lowerQuery.includes('head')) {
        matches = schoolData.faculty.filter(f => 
          f.position.toLowerCase().includes('principal') || 
          f.position.toLowerCase().includes('head')
        );
      } else if (lowerQuery.includes('math')) {
        matches = schoolData.faculty.filter(f => 
          f.department.toLowerCase().includes('math') ||
          f.subjects?.some(s => s.toLowerCase().includes('math'))
        );
      } else if (lowerQuery.includes('science')) {
        matches = schoolData.faculty.filter(f => 
          f.department.toLowerCase().includes('science') ||
          f.subjects?.some(s => s.toLowerCase().includes('science'))
        );
      } else if (lowerQuery.includes('english')) {
        matches = schoolData.faculty.filter(f => 
          f.department.toLowerCase().includes('english') ||
          f.subjects?.some(s => s.toLowerCase().includes('english'))
        );
      } else if (lowerQuery.includes('pe') || lowerQuery.includes('sports')) {
        matches = schoolData.faculty.filter(f => 
          f.department.toLowerCase().includes('physical education') ||
          f.subjects?.some(s => s.toLowerCase().includes('pe') || s.toLowerCase().includes('sports'))
        );
      } else if (lowerQuery.includes('filipino')) {
        matches = schoolData.faculty.filter(f => 
          f.department.toLowerCase().includes('filipino')
        );
      } else if (lowerQuery.includes('ict') || lowerQuery.includes('computer')) {
        matches = schoolData.faculty.filter(f => 
          f.department.toLowerCase().includes('technology') ||
          f.position.toLowerCase().includes('ict')
        );
      } else if (lowerQuery.includes('guidance') || lowerQuery.includes('counselor')) {
        matches = schoolData.faculty.filter(f => 
          f.department.toLowerCase().includes('guidance')
        );
      }
    }
    
    return matches;
  };

  const generateBotResponse = async (message: string): Promise<string> => {
    const lowerMessage = message.toLowerCase();
    
    // Create context for Gemini API
    const context = `
SCHOOL INFORMATION:
- Name: ${schoolData.schoolInfo.name}
- Address: ${schoolData.schoolInfo.address}
- Principal: ${schoolData.schoolInfo.principal}
- Operating Hours: Monday-Friday ${schoolData.schoolInfo.operatingHours.mondayToFriday}, Saturday ${schoolData.schoolInfo.operatingHours.saturday}, Sunday ${schoolData.schoolInfo.operatingHours.sunday}

LOCATIONS:
${schoolData.locations.map(loc => `- ${loc.name}: ${loc.description} (${loc.status})`).join('\n')}

FACULTY MEMBERS:
${schoolData.faculty.map(fac => `- ${fac.name}: ${fac.position}, ${fac.department}, ${fac.room}, ${fac.building}`).join('\n')}

QUICK ROUTES:
${Object.entries(schoolData.quickRoutes).map(([key, value]) => `- ${key}: ${value.description}`).join('\n')}
`;

    // Try Gemini API first if configured
    if (geminiService.isConfigured()) {
      console.log('🤖 Using Gemini API for:', message);
      try {
        const geminiResponse = await geminiService.generateResponse(message, context);
        if (geminiResponse) {
          console.log('✅ Gemini responded:', geminiResponse);
          return geminiResponse;
        } else {
          console.log('⚠️ Gemini returned null, using fallback');
        }
      } catch (error) {
        console.error('❌ Gemini API failed, using fallback:', error);
      }
    } else {
      console.log('📝 Gemini not configured, using fallback');
    }
    
    // Fallback to rule-based responses
    
    // Check for location questions FIRST (before faculty)
    if (lowerMessage.includes('where is') || lowerMessage.includes('location of') || lowerMessage.includes('find the') || lowerMessage.includes('locate')) {
      for (const location of schoolData.locations) {
        if (lowerMessage.includes(location.name.toLowerCase()) || 
            lowerMessage.includes('library') && location.name.toLowerCase().includes('dep_ed') ||
            lowerMessage.includes('canteen') && location.name.toLowerCase().includes('covered') ||
            lowerMessage.includes('office') && location.name.toLowerCase().includes('dep_ed')) {
          return `${location.name} is ${location.description}. ${location.status === 'proposed' ? 'This is a proposed facility.' : ''}`;
        }
      }
      
      // Check quick routes for common locations
      for (const [route, info] of Object.entries(schoolData.quickRoutes)) {
        if (lowerMessage.includes(route)) {
          return info.description;
        }
      }
    }
    
    // Check for faculty/teacher queries (after location checks)
    if (lowerMessage.includes('teacher') || lowerMessage.includes('faculty') || 
        lowerMessage.includes('staff') || lowerMessage.includes('mr.') || 
        lowerMessage.includes('mrs.') || lowerMessage.includes('dr.') ||
        lowerMessage.includes('who teaches') || lowerMessage.includes('where is')) {
      
      const facultyMatches = findFaculty(message);
      
      if (facultyMatches.length > 0) {
        if (facultyMatches.length === 1) {
          const faculty = facultyMatches[0];
          let response = `${faculty.icon} **${faculty.name}**\n\n`;
          response += `**Position:** ${faculty.position}\n`;
          response += `**Department:** ${faculty.department}\n`;
          response += `**Location:** ${faculty.room}, ${faculty.building}\n`;
          
          if (faculty.email) {
            response += `**Email:** ${faculty.email}\n`;
          }
          
          if (faculty.consultationHours) {
            response += `**Consultation Hours:** ${faculty.consultationHours}\n`;
          }
          
          if (faculty.subjects && faculty.subjects.length > 0) {
            response += `**Subjects:** ${faculty.subjects.join(', ')}\n`;
          }
          
          response += `\nWould you like directions to ${faculty.building}?`;
          return response;
        } else {
          let response = `I found ${facultyMatches.length} faculty members matching your query:\n\n`;
          facultyMatches.forEach((faculty, index) => {
            response += `${index + 1}. ${faculty.icon} ${faculty.name} - ${faculty.position}\n`;
            response += `   📍 ${faculty.room}, ${faculty.building}\n`;
            if (faculty.consultationHours) {
              response += `   ⏰ ${faculty.consultationHours}\n`;
            }
            response += '\n';
          });
          response += 'Please be more specific with the name if you need detailed information.';
          return response;
        }
      } else {
        return 'I couldn\'t find any faculty members matching your query. You can ask for:\n\n• Specific names (e.g., "Mr. Santos")\n• Departments (e.g., "math teacher")\n• Positions (e.g., "principal")\n• Subjects (e.g., "who teaches science?")';
      }
    }
    
    // Check for quick routes
    for (const [route, info] of Object.entries(schoolData.quickRoutes)) {
      if (lowerMessage.includes(route)) {
        return info.description;
      }
    }
    
    // Check for directions
    if (lowerMessage.includes('how to get to') || lowerMessage.includes('directions to')) {
      for (const location of schoolData.locations) {
        if (lowerMessage.includes(location.name.toLowerCase())) {
          return `To get to ${location.name}, please use the directions form below. Enter your current location and "${location.name}" as your destination.`;
        }
      }
    }
    
    // Check for facilities
    if (lowerMessage.includes('facilities') || lowerMessage.includes('what do you have')) {
      const facilities = schoolData.locations
        .filter(l => l.status === 'existing')
        .map(l => l.name)
        .join(', ');
      return `Our school has the following facilities: ${facilities}. We also have a proposed 2-storey building under planning.`;
    }
    
    // Check for operating hours
    if (lowerMessage.includes('hours') || lowerMessage.includes('open') || lowerMessage.includes('close')) {
      return `School hours: Monday-Friday ${schoolData.schoolInfo.operatingHours.mondayToFriday}, Saturday ${schoolData.schoolInfo.operatingHours.saturday}, Sunday - ${schoolData.schoolInfo.operatingHours.sunday}`;
    }
    
    // Check for principal
    if (lowerMessage.includes('principal') || lowerMessage.includes('head')) {
      return `The Principal of ${schoolData.schoolInfo.name} is ${schoolData.schoolInfo.principal}. You can find the Principal's Office in DepEd Building 4.`;
    }
    
    // Check for address
    if (lowerMessage.includes('address') || lowerMessage.includes('where')) {
      const hint = generateHints();
      return `${schoolData.schoolInfo.name} is located at ${schoolData.schoolInfo.address}.\n\n${hint}`;
    }
    
    // Check for help requests
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do') || lowerMessage.includes('how to use')) {
      return "I can help you with:\n\n📍 **Locations** - Find any place on campus\n🧭 **Directions** - Get step-by-step navigation\n👥 **Faculty & Staff** - Find teachers and their locations\n🏫 **Facilities** - Learn about school facilities\nℹ️ **School Info** - Hours, contacts, and general information\n\nJust ask me anything like \"Where is the library?\" or \"Who teaches math?\"";
    }
    
    // Default response
    const hint = generateHints();
    return `I can help you find locations, get directions, learn about our school facilities, or find faculty members. Try asking "Where is the library?", "How do I get to the covered court?", "Who teaches math?", or "Where is Mr. Santos?"\n\n${hint}`;
  };

  const sendMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot thinking time
    await new Promise(resolve => setTimeout(resolve, 1000));

    const botResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: await generateBotResponse(text),
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  return {
    messages,
    isTyping,
    showHints,
    setShowHints,
    sendMessage
  };
};
