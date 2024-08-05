import React from 'react';

const RobotLoading = () => (
    <div className="flex flex-col items-center justify-center h-64">
        <div className="relative w-24 h-32 mb-4">
            {/* Robot Head */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-2xl animate-bobble">
                {/* Eyes */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-blue-500 rounded-full animate-blink-rapidly"></div>
                <div className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full animate-blink-rapidly"></div>
                {/* Mouth */}
                <div className="absolute bottom-3 left-1/2 w-8 h-1 bg-gray-600 rounded-full -translate-x-1/2 animate-chatter"></div>
                {/* Antenna */}
                <div className="absolute top-0 left-1/2 w-1 h-4 bg-gray-500 -translate-x-1/2 -translate-y-full animate-wiggle">
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-red-500 rounded-full -translate-x-1/2 -translate-y-full animate-blink-colorful"></div>
                </div>
            </div>
            {/* Robot Body */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-400 to-gray-500 rounded-b-2xl animate-shake">
                {/* Search Icon */}
                <div className="absolute top-1/2 left-1/2 w-6 h-6 border-2 border-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2 animate-zoom-rotate">
                    <div className="absolute bottom-0 right-0 w-3 h-1 bg-blue-500 rotate-45 translate-x-1/2 translate-y-1/2"></div>
                </div>
                {/* Buttons */}
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse-grow"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse-grow"></div>
            </div>
            {/* Arms */}
            <div className="absolute top-16 left-0 w-3 h-10 bg-gray-500 rounded-full origin-top-left animate-flail-left"></div>
            <div className="absolute top-16 right-0 w-3 h-10 bg-gray-500 rounded-full origin-top-right animate-flail-right"></div>
        </div>
        <div className="w-[30%] flex justify-center items-center">
            <p className="text-lg font-bold text-gray-700 animate-typing">
                Searching vacancies<span className="animate-ellipsis">...</span>
            </p>
        </div>
    </div>
);

export default RobotLoading;