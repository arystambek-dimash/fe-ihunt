// Countdown.js
import React, {useEffect, useState} from 'react';
import {getTimeRemaining} from "../utils";

const jobTimes = ['10:00', '15:00', '18:00', '23:59']; // Время задач в 24-часовом формате

const Countdown = () => {
    const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(jobTimes));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(getTimeRemaining(jobTimes));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <header
            className="bg-green-500 text-white p-5 flex justify-center items-center w-full h-1 shadow-lg top-0 left-0 right-0 z-50">
            <div className="text-center">
                <h1 className="text-l ">
                    {`${timeRemaining.hours}ч ${timeRemaining.minutes}м ${timeRemaining.seconds}с до следующей задачи`}
                </h1>
            </div>
        </header>
    );
};

export default Countdown;