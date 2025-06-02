
import React, { useState, useEffect } from 'react';
import { XMarkIcon, BedIcon, UsersIcon } from '@/constants';
import { RoomType } from '../types';

const EditRoomModal = ({ isOpen, onClose, room, onSave }) => {
  const [selectedType, setSelectedType] = useState('');
  const [maxOccupancy, setMaxOccupancy] = useState('');
  const [error, setError] = useState(null);

  const suggestedMaxOccupancy = {
    [RoomType.Single]: 1,
    [RoomType.Double]: 2,
    [RoomType.Triple]: 3,
    [RoomType.Family]: 4,
  };

  useEffect(() => {
    if (isOpen && room) {
      setSelectedType(room.type || '');
      setMaxOccupancy(room.maxOccupancy != null ? String(room.maxOccupancy) : '');
      setError(null);
    }
  }, [isOpen, room]);

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedType(newType);
    if (suggestedMaxOccupancy[newType]) {
        setMaxOccupancy(String(suggestedMaxOccupancy[newType]));
    } else if (!newType) {
        setMaxOccupancy('');
    }
  };

  if (!isOpen || !room) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const occupancyNum = Number(maxOccupancy);
    if (!selectedType) {
      setError('Room type is required.');
      return;
    }
    if (maxOccupancy === '' || occupancyNum <= 0 || !Number.isInteger(occupancyNum)) {
      setError('Max occupancy must be a positive whole number.');
      return;
    }
    
    onSave(room.id, selectedType, occupancyNum);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="editRoomModalTitle">
      <div className="bg-neutral-container rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all my-8">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-neutral-border">
          <h2 id="editRoomModalTitle" className="text-xl font-semibold text-neutral-text-heading">Configure {room.name}</h2>
          <button 
            onClick={onClose} 
            className="text-neutral-muted hover:text-neutral-text p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close edit room modal"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        {error && <p role="alert" className="text-red-600 text-sm mb-3 bg-red-100 p-3 rounded-md border border-red-300">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="roomType" className="block text-sm font-medium text-neutral-text mb-1">Room Type</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BedIcon className="h-5 w-5 text-neutral-muted" />
              </div>
              <select
                id="roomType"
                value={selectedType}
                onChange={handleTypeChange}
                className="w-full pl-10 p-2.5 border border-neutral-border rounded-md shadow-sm focus:ring-primary focus:border-primary text-neutral-text bg-neutral-light focus:bg-neutral-base"
                required
                aria-required="true"
              >
                <option value="">Select Type...</option>
                {Object.values(RoomType).map(typeValue => (
                  <option key={typeValue} value={typeValue}>{typeValue}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="maxOccupancy" className="block text-sm font-medium text-neutral-text mb-1">Max Occupancy</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UsersIcon className="h-5 w-5 text-neutral-muted" />
              </div>
              <input
                type="number"
                id="maxOccupancy"
                value={maxOccupancy}
                onChange={(e) => setMaxOccupancy(e.target.value)}
                min="1"
                step="1"
                placeholder="e.g., 2"
                className="w-full pl-10 p-2.5 border border-neutral-border rounded-md shadow-sm focus:ring-primary focus:border-primary text-neutral-text bg-neutral-light focus:bg-neutral-base"
                required
                aria-required="true"
              />
            </div>
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
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoomModal;