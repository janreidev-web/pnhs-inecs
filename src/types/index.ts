export interface Location {
  id: string;
  name: string;
  type: 'entrance' | 'academic' | 'sports' | 'parking' | 'garden' | 'road';
  description: string;
  icon: string;
  status: 'existing' | 'proposed';
  coordinates?: { x: number; y: number };
}

export interface Direction {
  from: string;
  to: string;
  instructions: string;
  estimatedTime: string;
  distance: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface SchoolInfo {
  name: string;
  address: string;
  type: string;
  principal: string;
  propertyCustodian: string;
  operatingHours: {
    mondayToFriday: string;
    saturday: string;
    sunday: string;
  };
}

export interface Faculty {
  id: string;
  name: string;
  position: string;
  department: string;
  room: string;
  building: string;
  email?: string;
  consultationHours?: string;
  subjects?: string[];
  icon: string;
}
