
export type StationType = 'Fast' | 'Standard' | 'Hyper' | 'Mechanic';
export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
export type PaymentMethod = 'Online' | 'Cash';
export type AppView = 'dashboard' | 'stations' | 'services' | 'bookings' | 'profile' | 'admin' | 'provider_dashboard' | 'provider_services' | 'provider_bookings';
export type VehicleType = 'Two-wheeler' | 'Three-wheeler' | 'Four-wheeler';
export type UserRole = 'user' | 'provider';
export type BusinessType = 'Fast Charging' | 'EV Mechanic' | 'Normal Installer';

export interface Resource {
  id: string;
  name: string;
  status: 'Available' | 'Occupied' | 'Maintenance';
  bookedSlots: string[];
}

export interface Station {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: StationType;
  status: 'Available' | 'Occupied' | 'Maintenance';
  price: number;
  distance: string;
  address: string;
  availableSlots?: string[];
  resources?: Resource[];
}

export interface MechanicService {
  id: string;
  title: string;
  description: string;
  price: number;
  icon: string;
}

export interface UserBooking {
  id: string;
  type: 'Charging' | 'Mechanic' | 'Installation';
  title: string;
  date: string;
  time: string;
  status: BookingStatus;
  price: string;
  paymentMethod: PaymentMethod;
  location: string;
  vehicleId: string;
  userName?: string;
  userAvatar?: string;
}

export interface Vehicle {
  id: string;
  type: VehicleType;
  brand: string;
  model: string;
  batteryCapacity: number; // kWh
  batteryLevel: number; // percentage
  isCharging: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isPro: boolean;
  avatar: string;
  role: UserRole;
  businessType?: BusinessType;
  plugCount?: number;
  technicianCount?: number;
}
