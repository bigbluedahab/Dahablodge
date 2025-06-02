
import React, { useState, useEffect } from 'react';
import { XMarkIcon, CalendarDaysIcon, UsersIcon, CurrencyDollarIcon, OfficeBuildingIcon } from '@/constants'; 

const BookingModal = ({ isOpen, onClose, room, onSubmit }) => {
  const [guestName, setGuestName] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [ratePerNight, setRatePerNight] = useState(''); 
  const [bookingAgency, setBookingAgency] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [breakfastIncluded, setBreakfastIncluded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && room) {
      setGuestName('');
      const today = new Date().toISOString().split('T')[0];
      setCheckInDate(today);
      setCheckOutDate('');
      setRatePerNight('');
      setBookingAgency('');
      setNumberOfGuests(room.maxOccupancy && room.maxOccupancy > 0 ? 1 : 0); 
      setBreakfastIncluded(false);
      setError(null);
    }
  }, [isOpen, room]);

  if (!isOpen || !room) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!guestName || !checkInDate || !checkOutDate || ratePerNight === '' || Number(ratePerNight) <= 0 || !bookingAgency) {
      setError('All fields except breakfast are required. Rate per night must be positive.');
      return;
    }
    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      setError('Check-out date must be after check-in date.');
      return;
    }
    if (Number(numberOfGuests) <= 0) {
      setError('Number of guests must be at least 1.');
      return;
    }
    if (Number(numberOfGuests) > room.maxOccupancy) {
      setError(`Number of guests cannot exceed the room's maximum occupancy of ${room.maxOccupancy}.`);
      return;
    }
    
    onSubmit({
      guestName,
      roomId: room.id,
      checkInDate,
      checkOutDate,
      ratePerNight: Number(ratePerNight),
      bookingAgency,
      numberOfGuests: Number(numberOfGuests),
      breakfastIncluded,
    });
    onClose(); 
  };
  
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="bookingModalTitle">
      <div className="bg-neutral-container rounded-lg shadow-xl p-6 w-full max-w-lg transform transition-all my-8">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-neutral-border">
          <div>
            <h2 id="bookingModalTitle" className="text-xl font-semibold text-neutral-text-heading">Book {room.name}</h2>
            <p className="text-sm text-neutral-muted">{room.type} Room - Max Guests: {room.maxOccupancy}</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-neutral-muted hover:text-neutral-text p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close booking modal"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        {error && <p role="alert" className="text-red-600 text-sm mb-3 bg-red-100 p-3 rounded-md border border-red-300">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="guestName" className="block text-sm font-medium text-neutral-text mb-1">Guest Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UsersIcon className="h-5 w-5 text-neutral-muted" />
              </div>
              <input
                type="text"
                id="guestName"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full pl-10 p-2.5 border border-neutral-border rounded-md shadow-sm focus:ring-primary focus:border-primary text-neutral-text bg-neutral-light focus:bg-neutral-base"
                required
                aria-required="true"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="checkInDate" className="block text-sm font-medium text-neutral-text mb-1">Check-in Date</label>
               <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarDaysIcon className="h-5 w-5 text-neutral-muted" />
                </div>
                <input
                  type="date"
                  id="checkInDate"
                  value={checkInDate}
                  min={today}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full pl-10 p-2.5 border border-neutral-border rounded-md shadow-sm focus:ring-primary focus:border-primary text-neutral-text bg-neutral-light focus:bg-neutral-base"
                  required
                  aria-required="true"
                />
              </div>
            </div>
            <div>
              <label htmlFor="checkOutDate" className="block text-sm font-medium text-neutral-text mb-1">Check-out Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarDaysIcon className="h-5 w-5 text-neutral-muted" />
                </div>
                <input
                  type="date"
                  id="checkOutDate"
                  value={checkOutDate}
                  min={checkInDate || today}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full pl-10 p-2.5 border border-neutral-border rounded-md shadow-sm focus:ring-primary focus:border-primary text-neutral-text bg-neutral-light focus:bg-neutral-base"
                  required
                  aria-required="true"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ratePerNight" className="block text-sm font-medium text-neutral-text mb-1">Rate per Night (EGP)</label>
              <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CurrencyDollarIcon className="h-5 w-5 text-neutral-muted" />
                  </div>
                  <input
                    type="number"
                    id="ratePerNight"
                    value={ratePerNight}
                    onChange={(e) => setRatePerNight(e.target.value)}
                    min="0.01"
                    step="0.01"
                    className="w-full pl-10 p-2.5 border border-neutral-border rounded-md shadow-sm focus:ring-primary focus:border-primary text-neutral-text bg-neutral-light focus:bg-neutral-base"
                    required
                    aria-required="true"
                  />
                </div>
            </div>
            <div>
              <label htmlFor="numberOfGuests" className="block text-sm font-medium text-neutral-text mb-1">Number of Guests</label>
              <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UsersIcon className="h-5 w-5 text-neutral-muted" />
                  </div>
                <input
                  type="number"
                  id="numberOfGuests"
                  value={numberOfGuests}
                  onChange={(e) => setNumberOfGuests(Number(e.target.value))}
                  min="1"
                  max={room.maxOccupancy}
                  className="w-full pl-10 p-2.5 border border-neutral-border rounded-md shadow-sm focus:ring-primary focus:border-primary text-neutral-text bg-neutral-light focus:bg-neutral-base"
                  required
                  aria-required="true"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="bookingAgency" className="block text-sm font-medium text-neutral-text mb-1">Booking Agency</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <OfficeBuildingIcon className="h-5 w-5 text-neutral-muted" />
              </div>
              <input
                type="text"
                id="bookingAgency"
                value={bookingAgency}
                onChange={(e) => setBookingAgency(e.target.value)}
                placeholder="e.g., Direct, Booking.com"
                className="w-full pl-10 p-2.5 border border-neutral-border rounded-md shadow-sm focus:ring-primary focus:border-primary text-neutral-text bg-neutral-light focus:bg-neutral-base"
                required
                aria-required="true"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="breakfastIncluded"
              name="breakfastIncluded"
              type="checkbox"
              checked={breakfastIncluded}
              onChange={(e) => setBreakfastIncluded(e.target.checked)}
              className="h-4 w-4 text-primary border-neutral-border rounded focus:ring-primary"
            />
            <label htmlFor="breakfastIncluded" className="ml-2 block text-sm text-neutral-text">
              Breakfast Included
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-3 mt-2 border-t border-neutral-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-neutral-text bg-neutral-light hover:bg-neutral-border rounded-md border border-neutral-border transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;