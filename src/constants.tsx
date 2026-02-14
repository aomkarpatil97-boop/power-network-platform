
import { Station, MechanicService, UserBooking, Vehicle } from './types';

export const MOCK_STATIONS: Station[] = [
  {
    id: 's1',
    name: 'ElectraHub Downtown',
    lat: 37.7749,
    lng: -122.4194,
    type: 'Hyper',
    status: 'Available',
    price: 18.50,
    distance: '1.2 km',
    address: '455 Market St, Mumbai',
    availableSlots: ['09:00', '11:30', '14:00', '16:30']
  },
  {
    id: 's2',
    name: 'GreenDrive Plaza',
    lat: 37.7833,
    lng: -122.4167,
    type: 'Fast',
    status: 'Occupied',
    price: 12.25,
    distance: '2.5 km',
    address: '101 Post St, Mumbai',
    availableSlots: ['10:00', '12:00', '15:00']
  },
  {
    id: 's3',
    name: 'VoltPark North',
    lat: 37.7950,
    lng: -122.4000,
    type: 'Standard',
    status: 'Available',
    price: 8.50,
    distance: '4.8 km',
    address: '888 Marine Drive, Mumbai',
    availableSlots: ['08:00', '13:00', '17:00']
  },
  {
    id: 'm1',
    name: 'EV Specialist Workshop',
    lat: 37.7800,
    lng: -122.4100,
    type: 'Mechanic',
    status: 'Available',
    price: 1499,
    distance: '3.1 km',
    address: 'Sector 4, Navi Mumbai',
    availableSlots: ['09:00', '14:00']
  },
  {
    id: 'm2',
    name: 'QuickFix EV Care',
    lat: 37.7700,
    lng: -122.4250,
    type: 'Mechanic',
    status: 'Available',
    price: 999,
    distance: '0.8 km',
    address: 'Station Road, Mumbai',
    availableSlots: ['11:00', '16:00']
  }
];

export const MECHANIC_SERVICES: MechanicService[] = [
  {
    id: 'm1',
    title: 'Battery Diagnostic',
    description: 'Full health check and optimization of EV battery cells.',
    price: 1499,
    icon: 'Battery'
  },
  {
    id: 'm2',
    title: 'Brake Service',
    description: 'Regenerative braking system calibration and pad check.',
    price: 2999,
    icon: 'Disc'
  },
  {
    id: 'm3',
    title: 'Software Update',
    description: 'Latest firmware optimization for better efficiency.',
    price: 0,
    icon: 'Cpu'
  },
  {
    id: 'm4',
    title: 'Home Installation',
    description: 'Level 2 charger setup at your residential property.',
    price: 15999,
    icon: 'Zap'
  }
];

export const INITIAL_VEHICLE: Vehicle = {
  id: 'v1',
  type: 'Four-wheeler',
  brand: 'Tata',
  model: 'Nexon EV',
  batteryCapacity: 40.5,
  batteryLevel: 65,
  isCharging: false
};

export const INITIAL_BOOKINGS: UserBooking[] = [
  {
    id: 'b1',
    type: 'Charging',
    title: 'ElectraHub Downtown',
    date: 'Oct 22, 2024',
    time: '14:30',
    status: 'Confirmed',
    price: '₹450.00',
    paymentMethod: 'Online',
    location: '455 Market St, Mumbai',
    vehicleId: 'v1'
  }
];
