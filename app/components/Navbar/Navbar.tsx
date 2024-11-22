import React from 'react';

const Navbar = () => {
    return (
        <div className="max-w-screen-lg mx-auto px-4 py-4 md:px-8 md:py-4">
            <div className="mx-auto flex items-center justify-between">
                <a href="/" className="inline-flex items-center gap-2.5 text-base font-normal text-black" aria-label="logo">
                    <img src="/Assets/Logo/AR-ONE Logo.svg" alt="AR-ONE" className="h-8" />
                </a>

                <button
                    className="px-4 py-1 text-white bg-black rounded-md hover:bg-gray-800 transition duration-200"
                    onClick={() => window.location.href = '/login'}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Navbar;