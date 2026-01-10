import type { Location, SchoolInfo, Faculty } from '../types';

export const schoolData: {
  locations: Location[];
  directions: Record<string, string>;
  quickRoutes: Record<string, { location: string; description: string }>;
  schoolInfo: SchoolInfo;
  faculty: Faculty[];
} = {
  locations: [
    {
      id: 'gate_1',
      name: 'Gate 1',
      type: 'entrance',
      description: 'Main school entrance',
      icon: '🚪',
      status: 'existing',
      coordinates: { x: 0, y: 50 }
    },
    {
      id: 'gate_2',
      name: 'Gate 2',
      type: 'entrance',
      description: 'Secondary school entrance',
      icon: '🚪',
      status: 'existing',
      coordinates: { x: 100, y: 50 }
    },
    {
      id: 'dep_ed_bldg_4',
      name: 'DepEd Building 4',
      type: 'academic',
      description: 'Main academic building with classrooms and offices',
      icon: '🏫',
      status: 'existing',
      coordinates: { x: 20, y: 40 }
    },
    {
      id: 'covered_court',
      name: 'Covered Court',
      type: 'sports',
      description: 'Indoor sports court with roof coverage',
      icon: '🏀',
      status: 'existing',
      coordinates: { x: 80, y: 30 }
    },
    {
      id: 'open_court',
      name: 'Open Court',
      type: 'sports',
      description: 'Outdoor basketball/volleyball court',
      icon: '🏐',
      status: 'existing',
      coordinates: { x: 50, y: 20 }
    },
    {
      id: 'car_park',
      name: 'Car Park',
      type: 'parking',
      description: 'Vehicle parking area',
      icon: '🚗',
      status: 'existing',
      coordinates: { x: 90, y: 10 }
    },
    {
      id: 'gulayan_area',
      name: 'Gulayan sa Paaralan Area',
      type: 'garden',
      description: 'School vegetable garden area',
      icon: '🌱',
      status: 'existing',
      coordinates: { x: 30, y: 10 }
    },
    {
      id: 'proposed_2storey',
      name: 'Proposed 2-Storey Building',
      type: 'academic',
      description: 'Future 2-storey academic building with 4 classrooms',
      icon: '🏗️',
      status: 'proposed',
      coordinates: { x: 15, y: 25 }
    }
  ],
  directions: {
    'gate_1_to_dep_ed_bldg_4': 'From Gate 1, walk straight ahead for about 50 meters to reach DepEd Building 4.',
    'gate_1_to_covered_court': 'From Gate 1, walk straight to DepEd Building 4, then turn right and continue to the Covered Court.',
    'gate_2_to_covered_court': 'From Gate 2, walk straight ahead for about 30 meters to reach the Covered Court.',
    'covered_court_to_open_court': 'From the Covered Court, walk to the left side to reach the Open Court.',
    'dep_ed_bldg_4_to_gulayan_area': 'From DepEd Building 4, walk towards the back of the school to find the vegetable garden area.'
  },
  quickRoutes: {
    'library': { location: 'dep_ed_bldg_4', description: 'Library is in DepEd Building 4' },
    'canteen': { location: 'covered_court', description: 'Canteen is near the Covered Court' },
    'principal office': { location: 'dep_ed_bldg_4', description: 'Principal\'s Office is in DepEd Building 4' },
    'comfort room': { location: 'dep_ed_bldg_4', description: 'Comfort rooms are in DepEd Building 4 and Covered Court' }
  },
  schoolInfo: {
    name: 'Pagbilao National High School',
    address: 'Pagbilao, Quezon Province',
    type: 'Public High School',
    principal: 'ELMER C. RAVINA (Principal II)',
    propertyCustodian: 'MILAY N. SAMONTE',
    operatingHours: {
      mondayToFriday: '7:00 AM - 5:00 PM',
      saturday: '7:00 AM - 12:00 PM',
      sunday: 'Closed'
    }
  },
  faculty: [
    {
      id: 'principal',
      name: 'ELMER C. RAVINA',
      position: 'Principal II',
      department: 'Administration',
      room: 'Principal\'s Office',
      building: 'DepEd Building 4',
      email: 'principal@pnhs.edu.ph',
      consultationHours: 'Monday - Friday: 8:00 AM - 4:00 PM',
      subjects: ['School Administration'],
      icon: '👨‍💼'
    },
    {
      id: 'math_head',
      name: 'MARIA SANTOS',
      position: 'Math Department Head',
      department: 'Mathematics',
      room: 'Room 201',
      building: 'DepEd Building 4',
      email: 'msantos@pnhs.edu.ph',
      consultationHours: 'Monday - Friday: 3:00 PM - 4:00 PM',
      subjects: ['Algebra', 'Geometry', 'Statistics'],
      icon: '🧮'
    },
    {
      id: 'science_teacher',
      name: 'DR. JUAN REYES',
      position: 'Science Teacher',
      department: 'Science',
      room: 'Science Laboratory',
      building: 'DepEd Building 4',
      email: 'jreyes@pnhs.edu.ph',
      consultationHours: 'Tuesday & Thursday: 4:00 PM - 5:00 PM',
      subjects: ['Biology', 'Chemistry', 'Physics'],
      icon: '🔬'
    },
    {
      id: 'english_teacher',
      name: 'ELIZABETH CRUZ',
      position: 'English Teacher',
      department: 'English',
      room: 'Room 105',
      building: 'DepEd Building 4',
      email: 'ecruz@pnhs.edu.ph',
      consultationHours: 'Monday - Friday: 2:00 PM - 3:00 PM',
      subjects: ['English Literature', 'Grammar', 'Composition'],
      icon: '📚'
    },
    {
      id: 'pe_teacher',
      name: 'CARLOS MENDOZA',
      position: 'PE Teacher',
      department: 'Physical Education',
      room: 'PE Office',
      building: 'Covered Court',
      email: 'cmendoza@pnhs.edu.ph',
      consultationHours: 'Monday - Friday: 4:00 PM - 5:00 PM',
      subjects: ['Physical Education', 'Health', 'Sports'],
      icon: '⚽'
    },
    {
      id: 'filipino_teacher',
      name: 'ROSA LIM',
      position: 'Filipino Teacher',
      department: 'Filipino',
      room: 'Room 203',
      building: 'DepEd Building 4',
      email: 'rlim@pnhs.edu.ph',
      consultationHours: 'Wednesday & Friday: 3:00 PM - 4:00 PM',
      subjects: ['Filipino', 'Panitikan', 'Gramatika'],
      icon: '📝'
    },
    {
      id: 'ict_coordinator',
      name: 'ANTONIO TAN',
      position: 'ICT Coordinator',
      department: 'Technology',
      room: 'Computer Lab',
      building: 'DepEd Building 4',
      email: 'atan@pnhs.edu.ph',
      consultationHours: 'Monday - Friday: 1:00 PM - 2:00 PM',
      subjects: ['Computer Science', 'ICT', 'Digital Literacy'],
      icon: '💻'
    },
    {
      id: 'guidance_counselor',
      name: 'ANNA GONZALEZ',
      position: 'Guidance Counselor',
      department: 'Guidance',
      room: 'Guidance Office',
      building: 'DepEd Building 4',
      email: 'agonzalez@pnhs.edu.ph',
      consultationHours: 'Monday - Friday: 8:00 AM - 5:00 PM',
      subjects: ['Guidance Counseling', 'Career Planning'],
      icon: '🎯'
    }
  ]
};
