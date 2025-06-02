
import React from 'react';
import { RoomStatus } from '../types';
import { BedIcon, UsersIcon, CalendarDaysIcon, CurrencyDollarIcon, PlusCircleIcon, CheckIcon, XMarkIcon, Cog6ToothIcon } from '@/constants';

const RoomCard = ({ room, booking, onBook, onCheckout, onOpenEditModal }) => {
  const getStatusStyles = () => {
    switch (room.status) {
      case RoomStatus.Available:
        return {
          borderColor: 'border-green-500',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          iconColor: 'text-green-600',
        };
      case RoomStatus.Occupied:
        return {
          borderColor: 'border-red-500',
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          iconColor: 'text-red-600',
        };
      case RoomStatus.Cleaning:
        return {
          borderColor: 'border-yellow-500',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-700',
          iconColor: 'text-yellow-600',
        };
      default:
        return {
          borderColor: 'border-neutral-border',
          bgColor: 'bg-neutral-light',
          textColor: 'text-neutral-text',
          iconColor: 'text-neutral-muted',
        };
    }
  };

  const statusStyles = getStatusStyles();
  const isConfigured = room.type && room.maxOccupancy != null && room.maxOccupancy > 0;
  const bookingButtonDisabledTitle = !isConfigured ? "Room type and max occupancy must be set first (use cog icon)." : "";

  return (
    <div className={`p-4 rounded-lg shadow-lg border-l-4 ${statusStyles.borderColor} ${statusStyles.bgColor} flex flex-col justify-between h-full bg-neutral-container hover:shadow-xl transition-shadow duration-300`}>
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <BedIcon className={`w-5 h-5 mr-2 ${statusStyles.iconColor}`} />
            <h3 className="text-lg font-semibold text-neutral-text-heading">{room.name}</h3>
          </div>
          <button 
            onClick={() => onOpenEditModal(room)} 
            className="text-neutral-muted hover:text-primary p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            aria-label={`Edit room ${room.name} configuration`}
            title="Edit Room Configuration"
          >
            <Cog6ToothIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="text-xs text-neutral-text mb-1">
          <span className="font-medium">Type:</span> {room.type || <span className="text-neutral-muted italic">Not Set</span>}
        </div>
        <div className="text-xs text-neutral-text mb-1">
          <span className="font-medium">Max Guests:</span> {room.maxOccupancy != null ? room.maxOccupancy : <span className="text-neutral-muted italic">N/A</span>}
        </div>
        <p className={`text-sm font-medium mb-3 ${statusStyles.textColor}`}>Status: {room.status}</p>
        
        {room.status === RoomStatus.Occupied && booking && (
          <div className="text-xs text-neutral-text space-y-1.5 mt-2 border-t border-neutral-border pt-2">
            <div className="flex items-center">
              <UsersIcon className="w-4 h-4 mr-2 text-neutral-muted" />
              <span>Guest: {booking.guestName} ({booking.numberOfGuests} {booking.numberOfGuests > 1 ? 'persons' : 'person'})</span>
            </div>
            <div className="flex items-center">
              <CalendarDaysIcon className="w-4 h-4 mr-2 text-neutral-muted" />
              <span>Out: {new Date(booking.checkOutDate).toLocaleDateString()}</span>
            </div>
             <div className="flex items-center">
              <CurrencyDollarIcon className="w-4 h-4 mr-2 text-neutral-muted" />
              <span>Total: {booking.price ? booking.price.toFixed(2) : 'N/A'} EGP</span>
            </div>
             <div className="flex items-center">
              <span className="font-medium mr-1 text-neutral-muted">Agency:</span> {booking.bookingAgency}
            </div>
            <div className="flex items-center">
              {booking.breakfastIncluded ? 
                <CheckIcon className="w-4 h-4 mr-2 text-green-500" /> : 
                <XMarkIcon className="w-4 h-4 mr-2 text-red-500" />
              }
              <span>Breakfast {booking.breakfastIncluded ? 'Included' : 'Not Included'}</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2">
        {room.status === RoomStatus.Available && (
          <button
            onClick={() => onBook(room)}
            disabled={!isConfigured}
            title={bookingButtonDisabledTitle}
            className={`w-full font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out text-sm flex items-center justify-center ${
              isConfigured ? 'bg-primary hover:bg-primary-dark text-white' : 'bg-neutral-border text-neutral-muted cursor-not-allowed'
            }`}
            aria-label={`Book room ${room.name}`}
          >
            <PlusCircleIcon className="w-4 h-4 mr-2" /> Book Room
          </button>
        )}
        {room.status === RoomStatus.Occupied && (
          <>
            <button
              onClick={() => onCheckout(room.id)}
              className="w-full bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out text-sm"
              aria-label={`Check out from room ${room.name}`}
            >
              Check Out
            </button>
            <button
              onClick={() => onBook(room)} // Allows re-booking/extending for an occupied room (if logic supports)
              disabled={!isConfigured}
              title={bookingButtonDisabledTitle}
              className={`w-full font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out text-sm flex items-center justify-center mt-2 ${
                isConfigured ? 'bg-primary hover:bg-primary-dark text-white' : 'bg-neutral-border text-neutral-muted cursor-not-allowed'
              }`}
              aria-label={`Create new booking for room ${room.name}`}
            >
               <PlusCircleIcon className="w-4 h-4 mr-2" /> Book Again
            </button>
          </>
        )}
         {room.status === RoomStatus.Cleaning && (
          <button
            onClick={() => onBook(room)}
            disabled={!isConfigured}
            title={bookingButtonDisabledTitle}
            className={`w-full font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out text-sm flex items-center justify-center ${
              isConfigured ? 'bg-neutral-text hover:bg-neutral-text-heading text-white' : 'bg-neutral-border text-neutral-muted cursor-not-allowed'
            }`}
            aria-label={`Book room ${room.name} (needs cleaning)`}
          >
            <PlusCircleIcon className="w-4 h-4 mr-2" /> Book (Needs Cleaning)
          </button>
        )}
      </div>
    </div>
  );
};

export default RoomCard;