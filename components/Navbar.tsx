
import React from 'react';
import { APP_TITLE, BedIcon } from '@/constants';

const Navbar = () => {
  return (
    <nav className="bg-primary text-neutral-light shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <BedIcon className="w-8 h-8 mr-3 text-accent" />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{APP_TITLE}</h1>
          </div>
          {/* Future navigation links can go here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;