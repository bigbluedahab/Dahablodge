
import React from 'react';
import { CalendarDaysIcon, OfficeBuildingIcon, ArrowDownTrayIcon, UsersIcon, CheckIcon, XMarkIcon } from '@/constants';

const CurrentBookingsTable = ({ bookings, onExportReport }) => {
  const activeBookings = bookings.filter(b => {
    const today = new Date();
    today.setHours(0,0,0,0); 
    try {
      return new Date(b.checkOutDate) >= today;
    } catch (e) {
      console.error("Invalid checkOutDate for booking:", b);
      return false;
    }
  }).sort((a,b) => new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime());

  return (
    <div className="bg-neutral-container p-4 sm:p-6 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-3 border-b border-neutral-border">
        <h2 className="text-lg sm:text-xl font-semibold text-neutral-text-heading mb-2 sm:mb-0 flex items-center">
          <CalendarDaysIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-primary" />
          Active & Upcoming Bookings
        </h2>
        {onExportReport && (
          <button
            onClick={onExportReport}
            className="bg-accent hover:bg-accent-dark text-white font-semibold py-2 px-3 sm:px-4 rounded-md transition duration-150 ease-in-out text-xs sm:text-sm flex items-center"
            aria-label="Export Occupancy Report"
          >
            <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
            Export Report
          </button>
        )}
      </div>
      
      {activeBookings.length === 0 ? (
        <div className="text-center py-10">
          <CalendarDaysIcon className="w-12 h-12 text-neutral-muted mx-auto mb-4" />
          <p className="text-neutral-text">No active or upcoming bookings at the moment.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-border">
            <thead className="bg-neutral-light">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-text uppercase tracking-wider">Guest Name</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-text uppercase tracking-wider">Room</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-text uppercase tracking-wider">Check-in</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-text uppercase tracking-wider">Check-out</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-text uppercase tracking-wider">Nights</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-text uppercase tracking-wider">Guests</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-text uppercase tracking-wider">Breakfast</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-text uppercase tracking-wider">Rate/Night</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-text uppercase tracking-wider">Total</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-text uppercase tracking-wider">Agency</th>
              </tr>
            </thead>
            <tbody className="bg-neutral-base divide-y divide-neutral-border">
              {activeBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-neutral-light transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-neutral-text-heading">{booking.guestName}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-text">{booking.roomName}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-text">{new Date(booking.checkInDate).toLocaleDateString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-text">{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-text text-center">{booking.numberOfNights}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-text text-center">
                    <div className="flex items-center justify-center">
                       <UsersIcon className="w-4 h-4 mr-1 text-neutral-muted"/> {booking.numberOfGuests}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-text text-center">
                    {booking.breakfastIncluded ? 
                      <CheckIcon className="w-5 h-5 text-green-500 mx-auto" title="Breakfast Included" /> : 
                      <XMarkIcon className="w-5 h-5 text-red-500 mx-auto" title="No Breakfast" />
                    }
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-text">{booking.ratePerNight ? booking.ratePerNight.toFixed(2) : 'N/A'}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-text font-semibold">{booking.price ? booking.price.toFixed(2) : 'N/A'}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-text">
                    <div className="flex items-center">
                      <OfficeBuildingIcon className="w-4 h-4 mr-1.5 text-neutral-muted"/> 
                      {booking.bookingAgency}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CurrentBookingsTable;