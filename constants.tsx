// constants.tsx
import React from 'react'; // Needed for JSX in icon components
import { RoomStatus, RoomType } from './types';

export const APP_TITLE = "Dahab Lodge Pro";

export const TOTAL_ROOMS = 8; // Example, can be adjusted

export const INITIAL_ROOMS = [
  { id: 'R101', name: 'Room 101', status: RoomStatus.Available, currentBookingId: null, type: RoomType.Double, maxOccupancy: 2 },
  { id: 'R102', name: 'Room 102', status: RoomStatus.Available, currentBookingId: null, type: RoomType.Single, maxOccupancy: 1 },
  { id: 'R103', name: 'Room 103', status: RoomStatus.Cleaning, currentBookingId: null, type: RoomType.Family, maxOccupancy: 4 },
  { id: 'R201', name: 'Room 201', status: RoomStatus.Occupied, currentBookingId: 'B-sample1', type: RoomType.Double, maxOccupancy: 2 }, // Example with a placeholder booking ID
  { id: 'R202', name: 'Room 202', status: RoomStatus.Available, currentBookingId: null, type: RoomType.Triple, maxOccupancy: 3 },
  { id: 'R203', name: 'Room 203', status: RoomStatus.Available, currentBookingId: null, type: RoomType.Single, maxOccupancy: 1 },
  { id: 'R204', name: 'Room 204', status: RoomStatus.Available, currentBookingId: null, type: RoomType.Double, maxOccupancy: 2 },
  { id: 'R301', name: 'Suite 301', status: RoomStatus.Available, currentBookingId: null, type: RoomType.Family, maxOccupancy: 5 },
];

// Icon Components (Using Heroicons SVG paths for consistency)
export const BedIcon = ({ className = "w-6 h-6", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125V6.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v.001c0 .621.504 1.125 1.125 1.125z" />
  </svg>
);

export const UsersIcon = ({ className = "w-6 h-6", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

export const CalendarDaysIcon = ({ className = "w-6 h-6", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5M12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
  </svg>
);

export const CurrencyDollarIcon = ({ className = "w-6 h-6", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const PlusCircleIcon = ({ className = "w-6 h-6", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const CheckIcon = ({ className = "w-6 h-6", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

export const XMarkIcon = ({ className = "w-6 h-6", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const Cog6ToothIcon = ({ className = "w-6 h-6", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93L15.6 7.23c.496.166.948.487 1.32.872l.905-.34c.507-.19.994.016 1.284.43l.817.992c.29.351.326.86.083 1.248l-.538.764a1.117 1.117 0 01-.921.622H17.4c-.441 0-.834.291-.986.714l-.496 1.736A1.125 1.125 0 0114.75 15h-5.5a1.125 1.125 0 01-1.17-.939l-.496-1.736c-.152-.423-.545-.714-.986-.714h-.735a1.125 1.125 0 01-.92-.622l-.538-.764c-.244-.389-.208-.898.083-1.249l.817-.992c.29-.413.777-.62 1.284-.43l.905.34c.372-.386.824-.707 1.32-.872l.753-.304c.396-.166.71-.506.78-.93l.149-.894z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const OfficeBuildingIcon = ({ className = "w-6 h-6", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6.75M9 9.75h6.75M9 12.75h6.75M9 15.75h6.75M9 18.75h6.75M9 3.75h6.75M11.25 3.75v18" />
  </svg>
);

export const ArrowDownTrayIcon = ({ className = "w-6 h-6", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const SparklesIcon = ({ className = "w-6 h-6", ...rest }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 7.5l.813 2.846a4.5 4.5 0 012.187 2.187L24 12l-2.75.767a4.5 4.5 0 01-2.187 2.187l-.813 2.846-2.846-.813a4.5 4.5 0 01-2.187-2.187L12 12.75l.767-2.75a4.5 4.5 0 012.187-2.187l2.846-.813z" />
    </svg>
);