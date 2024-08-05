import React, {useEffect, useState} from 'react';
import {getTimeRemaining} from "../utils";

const jobTimes = ['01:00', '03:00', '05:00', '07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00', '23:00'];

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