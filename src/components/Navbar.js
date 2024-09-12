import React, { useState } from 'react';
import { Transition } from '@headlessui/react'; // For animations

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold">MyWebsite</div>
        <button
          className="text-white lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <div className="hidden lg:flex space-x-4">
          <a href="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
            Home
          </a>
          <a href="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
            About
          </a>
          <a href="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
            Services
          </a>
          <a href="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
            Contact
          </a>
        </div>
      </div>
      <Transition
        show={isOpen}
        enter="transition-opacity duration-300 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="lg:hidden">
          <a href="/" className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
            Home
          </a>
          <a href="/" className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
            About
          </a>
          <a href="/" className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
            Services
          </a>
          <a href="/" className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
            Contact
          </a>
        </div>
      </Transition>
    </nav>
  );
}

export default Navbar;
