
import React from 'react';
import { CurrencyDollarIcon } from '@/constants';

const RevenueSummary = ({ bookings }) => {
  const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.price || 0), 0);

  return (
    <div className="bg-neutral-container p-6 rounded-lg shadow-lg h-full flex flex-col justify-center">
      <div className="flex items-center mb-4">
        <CurrencyDollarIcon className="w-6 h-6 mr-2 text-accent" />
        <h2 className="text-xl font-semibold text-neutral-text-heading">
          Revenue Overview
        </h2>
      </div>
      <div className="text-center">
        <p className="text-neutral-text text-sm">Total Revenue Generated</p>
        <p className="text-4xl font-bold text-primary mt-1">
          {totalRevenue.toFixed(2)} <span className="text-2xl font-medium">EGP</span>
        </p>
        <p className="text-xs text-neutral-muted mt-2">Based on {bookings.length} booking(s)</p>
      </div>
    </div>
  );
};

export default RevenueSummary;