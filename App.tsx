
import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import RoomCard from './components/RoomCard';
import BookingModal from './components/BookingModal';
import EditRoomModal from './components/EditRoomModal';
import CurrentBookingsTable from './components/CurrentBookingsTable';
import RevenueSummary from './components/RevenueSummary';
import BookingTimeline from './components/BookingTimeline';
import { RoomStatus, RoomType } from './types'; 
import { INITIAL_ROOMS, SparklesIcon } from '@/constants'; // Changed from @/constants.tsx
import useLocalStorage from './hooks/useLocalStorage';

const calculateNumberOfNights = (checkInStr, checkOutStr) => {
  const checkInDate = new Date(checkInStr);
  const checkOutDate = new Date(checkOutStr);
  checkInDate.setHours(0, 0, 0, 0);
  checkOutDate.setHours(0, 0, 0, 0);
  const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
};

const App = () => {
  const [rooms, setRooms] = useLocalStorage('dahabLodgeProRooms_v2', INITIAL_ROOMS.map(r => ({
      ...r,
      // Ensure initial rooms have default type/maxOccupancy if not already set
      type: r.type || RoomType.Double, 
      maxOccupancy: r.maxOccupancy || 2 
  })));
  const [bookings, setBookings] = useLocalStorage('dahabLodgeProBookings_v2', []);
  
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null);

  const [isEditRoomModalOpen, setIsEditRoomModalOpen] = useState(false);
  const [selectedRoomForEdit, setSelectedRoomForEdit] = useState(null);

  const handleOpenEditRoomModal = useCallback((room) => {
    setSelectedRoomForEdit(room);
    setIsEditRoomModalOpen(true);
  }, []);

  const handleCloseEditRoomModal = useCallback(() => {
    setIsEditRoomModalOpen(false);
    setSelectedRoomForEdit(null);
  }, []);

  const handleSaveRoomConfiguration = useCallback((roomId, type, maxOccupancy) => {
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === roomId ? { ...room, type, maxOccupancy: Number(maxOccupancy) } : room
      )
    );
    handleCloseEditRoomModal();
  }, [setRooms, handleCloseEditRoomModal]);

  const handleOpenBookingModal = useCallback((room) => {
    if (!room.type || room.maxOccupancy == null || room.maxOccupancy <= 0) {
      alert("This room needs to be configured with a type and valid max occupancy first. Please use the 'Edit Room' (cog icon) button.");
      return;
    }
    setSelectedRoomForBooking(room);
    setIsBookingModalOpen(true);
  }, []); 

  const handleCloseBookingModal = useCallback(() => {
    setIsBookingModalOpen(false);
    setSelectedRoomForBooking(null);
  }, []);

  const handleCreateBooking = useCallback((bookingData) => {
    const newBookingStart = new Date(bookingData.checkInDate);
    newBookingStart.setHours(0,0,0,0);
    const newBookingEnd = new Date(bookingData.checkOutDate);
    newBookingEnd.setHours(0,0,0,0);

    const existingBookingsForRoom = bookings.filter(b => b.roomId === bookingData.roomId);

    for (const existingBooking of existingBookingsForRoom) {
      const existingStart = new Date(existingBooking.checkInDate);
      existingStart.setHours(0,0,0,0);
      const existingEnd = new Date(existingBooking.checkOutDate);
      existingEnd.setHours(0,0,0,0);

      if (newBookingStart.getTime() < existingEnd.getTime() && newBookingEnd.getTime() > existingStart.getTime()) {
        alert("This room is already booked for the selected dates. Please choose different dates or another room.");
        return;
      }
    }

    const numberOfNights = calculateNumberOfNights(bookingData.checkInDate, bookingData.checkOutDate);
    const totalPrice = bookingData.ratePerNight * numberOfNights;

    const newBooking = {
      ...bookingData,
      id: `B-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      price: totalPrice,
      numberOfNights: numberOfNights,
      createdAt: new Date().toISOString(),
      roomName: rooms.find(r => r.id === bookingData.roomId)?.name || 'Unknown Room'
    };

    setBookings(prevBookings => [...prevBookings, newBooking]);
    setRooms(prevRooms => 
      prevRooms.map(room => 
        room.id === newBooking.roomId 
          ? { ...room, status: RoomStatus.Occupied, currentBookingId: newBooking.id } 
          : room
      )
    );
  }, [bookings, rooms, setBookings, setRooms]); 

  const handleCheckout = useCallback((roomId) => {
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === roomId
          ? { ...room, status: RoomStatus.Cleaning, currentBookingId: null } // Change to Needs Cleaning on checkout
          : room
      )
    );
    // To make a room available after cleaning, another action would be needed, e.g. "Mark as Cleaned"
    // For simplicity now, it goes to Needs Cleaning. Can book from Needs Cleaning if needed.
  }, [setRooms]);

  const getRoomBooking = (roomId, currentBookingId) => {
    if (!currentBookingId) return null;
    return bookings.find(b => b.id === currentBookingId && b.roomId === roomId);
  };

  const handleExportOccupancyReport = useCallback(() => {
    const today = new Date();
    today.setHours(0,0,0,0);

    const currentlyOccupiedBookings = bookings.filter(booking => {
      const checkInDate = new Date(booking.checkInDate);
      checkInDate.setHours(0,0,0,0);
      const checkOutDate = new Date(booking.checkOutDate);
      checkOutDate.setHours(0,0,0,0);
      return checkInDate.getTime() <= today.getTime() && today.getTime() < checkOutDate.getTime();
    });

    if (currentlyOccupiedBookings.length === 0) {
      alert("No rooms are currently occupied to generate a report.");
      return;
    }

    const headers = ["Room Name", "Guest Name", "Check-in Date", "Check-out Date", "Nights", "Guests", "Breakfast", "Rate/Night (EGP)", "Total Price (EGP)", "Booking Agency"];
    const csvRows = [headers.join(",")];

    currentlyOccupiedBookings.forEach(booking => {
      const row = [
        booking.roomName,
        booking.guestName,
        booking.checkInDate,
        booking.checkOutDate,
        booking.numberOfNights,
        booking.numberOfGuests,
        booking.breakfastIncluded ? "Yes" : "No",
        booking.ratePerNight ? booking.ratePerNight.toFixed(2) : 'N/A',
        booking.price ? booking.price.toFixed(2) : 'N/A',
        booking.bookingAgency
      ];
      csvRows.push(row.join(","));
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      const reportDate = new Date().toISOString().split('T')[0];
      link.setAttribute("href", url);
      link.setAttribute("download", `dahab_lodge_pro_occupancy_${reportDate}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
        alert("CSV export is not supported in your browser.");
    }
  }, [bookings]);

  return (
    <div className="min-h-screen bg-neutral-light flex flex-col font-sans text-neutral-text">
      <Navbar />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow w-full">
        
        {/* Room Dashboard Section */}
        <section id="room-dashboard" className="mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-text-heading mb-6">Room Dashboard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {rooms.map(room => (
              <RoomCard
                key={room.id}
                room={room}
                booking={getRoomBooking(room.id, room.currentBookingId)}
                onBook={handleOpenBookingModal}
                onCheckout={handleCheckout}
                onOpenEditModal={handleOpenEditRoomModal}
              />
            ))}
          </div>
        </section>

        {/* Booking Timeline Section */}
        <section id="booking-timeline" className="mb-8 lg:mb-12">
          <BookingTimeline rooms={rooms} bookings={bookings} />
        </section>

        {/* Combined Bookings Table, Revenue, and Insights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 lg:mb-12">
          <section id="current-bookings" className="lg:col-span-2">
             <CurrentBookingsTable bookings={bookings} onExportReport={handleExportOccupancyReport} />
          </section>
          
          <div className="space-y-8">
            <section id="revenue-summary">
              <RevenueSummary bookings={bookings} />
            </section>
            
            {/* Lodge Insights Section - New */}
            <section id="lodge-insights" className="bg-neutral-container p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-3">
                    <SparklesIcon className="w-6 h-6 mr-2 text-primary" />
                    <h3 className="text-xl font-semibold text-neutral-text-heading">Lodge Insights</h3>
                </div>
                <p className="text-sm text-neutral-text">
                    Unlock powerful insights and suggestions soon! 
                    Get AI-driven recommendations for pricing, occupancy optimization, and enhanced guest experiences.
                </p>
                <div className="mt-4">
                    <div className="h-2 bg-neutral-border rounded-full w-full overflow-hidden">
                        <div className="h-2 bg-primary rounded-full" style={{ width: '20%' }} title="Coming Soon Progress"></div>
                    </div>
                    <p className="text-xs text-neutral-muted text-right mt-1">Feature in development...</p>
                </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-primary text-center text-sm text-neutral-light py-6">
        © {new Date().getFullYear()} Dahab Lodge Pro. All rights reserved. Powered by Good Vibes.
      </footer>

      {selectedRoomForBooking && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={handleCloseBookingModal}
          room={selectedRoomForBooking}
          onSubmit={handleCreateBooking}
        />
      )}
      {selectedRoomForEdit && ( 
        <EditRoomModal
          isOpen={isEditRoomModalOpen}
          onClose={handleCloseEditRoomModal}
          room={selectedRoomForEdit}
          onSave={handleSaveRoomConfiguration}
        />
      )}
    </div>
  );
};

export default App;