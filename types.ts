// Enum converted to plain JavaScript object
export const RoomStatus = {
  Available: 'Available',
  Occupied: 'Occupied',
  Cleaning: 'Needs Cleaning',
};

export const RoomType = {
  Single: 'Single',
  Double: 'Double',
  Triple: 'Triple',
  Family: 'Family',
};

// Interfaces and types are removed as they are TypeScript-specific
// and may cause errors if not transpiled.
// Components will rely on prop shapes (duck typing) for now.

// export interface Room {
//   id: string;
//   name: string;
//   status: string; // Was RoomStatus
//   type: string; // Was RoomType, e.g., RoomType.Double
//   maxOccupancy: number;
//   currentBookingId?: string | null;
// }

// export interface Booking {
//   id: string;
//   guestName: string;
//   roomId: string;
//   roomName: string;
//   checkInDate: string; // YYYY-MM-DD
//   checkOutDate: string; // YYYY-MM-DD
//   ratePerNight: number; // Price per night in EGP
//   price: number; // Total price for the stay in EGP (calculated: ratePerNight * numberOfNights)
//   bookingAgency: string; // e.g., "Booking.com", "Direct"
//   numberOfNights: number; // Calculated
//   numberOfGuests: number;
//   breakfastIncluded: boolean;
//   createdAt: string; // ISO date string
// }

// export type NewBookingData = {
//   guestName: string;
//   roomId: string;
//   checkInDate: string; // YYYY-MM-DD
//   checkOutDate: string; // YYYY-MM-DD
//   ratePerNight: number; // EGP
//   bookingAgency: string;
//   numberOfGuests: number;
//   breakfastIncluded: boolean;
// };