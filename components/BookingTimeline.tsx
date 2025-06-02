
import React from 'react';

const getDaysArray = (start, end) => {
  const arr = [];
  for (let dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
};

const formatDateHeader = (date) => {
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

const BookingTimeline = ({ rooms, bookings }) => {
  const NUMBER_OF_DAYS_TO_DISPLAY = 30;
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0); 

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + NUMBER_OF_DAYS_TO_DISPLAY - 1);
  endDate.setHours(0, 0, 0, 0);

  const daysToDisplay = getDaysArray(startDate, endDate);

  return (
    <div className="bg-neutral-container p-4 sm:p-6 rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-2xl font-semibold text-neutral-text-heading mb-6">Booking Timeline</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-neutral-border">
          <thead className="bg-neutral-light">
            <tr>
              <th className="sticky left-0 z-10 bg-neutral-light px-3 py-3 text-left text-xs font-medium text-neutral-text uppercase tracking-wider border border-neutral-border whitespace-nowrap">Room</th>
              {daysToDisplay.map(day => (
                <th key={day.toISOString()} className="px-2 py-3 text-center text-xs font-medium text-neutral-text uppercase tracking-wider border border-neutral-border whitespace-nowrap">
                  {formatDateHeader(day)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-neutral-base divide-y divide-neutral-border">
            {rooms.map(room => (
              <tr key={room.id}>
                <td className="sticky left-0 z-10 bg-neutral-base px-3 py-3 text-sm font-medium text-neutral-text-heading border border-neutral-border whitespace-nowrap hover:bg-neutral-light transition-colors">{room.name}</td>
                {daysToDisplay.map(day => {
                  const dayTimestamp = day.getTime();
                  const relevantBooking = bookings.find(b => {
                    if (b.roomId !== room.id) return false;
                    const checkIn = new Date(b.checkInDate);
                    checkIn.setHours(0,0,0,0);
                    const checkOut = new Date(b.checkOutDate);
                    checkOut.setHours(0,0,0,0); 
                    
                    return checkIn.getTime() <= dayTimestamp && checkOut.getTime() > dayTimestamp;
                  });

                  if (relevantBooking) {
                    return (
                      <td key={`${room.id}-${day.toISOString()}`} className="px-2 py-2 text-xs text-white bg-primary border border-neutral-border text-center overflow-hidden text-ellipsis whitespace-nowrap cursor-default" title={`${relevantBooking.guestName} (${new Date(relevantBooking.checkInDate).toLocaleDateString()} - ${new Date(relevantBooking.checkOutDate).toLocaleDateString()})`}>
                        {relevantBooking.guestName.split(' ')[0]} {/* Show first name */}
                      </td>
                    );
                  }
                  return (
                    <td key={`${room.id}-${day.toISOString()}`} className="px-2 py-2 bg-neutral-light hover:bg-slate-200 transition-colors border border-neutral-border">&nbsp;</td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       <p className="mt-4 text-xs text-neutral-muted">
        Displaying bookings for the next {NUMBER_OF_DAYS_TO_DISPLAY} days. Booked cells (in blue) show guest names.
      </p>
    </div>
  );
};

export default BookingTimeline;