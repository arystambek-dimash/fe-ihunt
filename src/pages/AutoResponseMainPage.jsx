import api from "../services/api";
import React, { useState, useEffect } from 'react';
import { ReactTyped } from "react-typed";
import PositionTable from "../components/PositionTable";

export default function AutoResponseMainPage() {
    const [positions, setPositions] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        fetchPositions();
    }, []);

    const fetchPositions = async () => {
        try {
            const response = await api.get('/vacancies/positions');
            if (response.data && Array.isArray(response.data.positions)) {
                setPositions(response.data.positions);
            } else {
                setPositions([]);
            }
        } catch (error) {
            console.error('Error fetching positions:', error);
            setPositions([]);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/vacancies/positions', { position: inputValue });
            fetchPositions();
            setInputValue('');
        } catch (error) {
            console.error('Error submitting position:', error);
        }
    };

    return (
        <div className="flex flex-col items-center px-4">
            <div className="mt-12 md:mt-24 w-full max-w-screen-lg mx-auto flex flex-col items-center">
                <h1 className="mb-12 text-3xl md:text-4xl font-bold leading-tight text-center">
                    <ReactTyped
                        strings={[
                            "Найди свою работу в один клик.",
                        ]}
                        typeSpeed={150}
                        backSpeed={100}
                        loop
                    />
                </h1>
                <form className="w-full flex justify-center gap-2" onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        placeholder="Напиши свой желаемый должность"
                        className="h-14 sm:h-16 w-full sm:w-3/4 text-base font-regular rounded-lg px-4"
                        style={{ boxShadow: '0px 2px 4px 0px rgba(25, 33, 61, 0.08)' }}
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button
                        type="submit"
                        className="h-14 sm:h-16 w-14 sm:w-16 bg-gray-800 flex items-center justify-center rounded-lg"
                        style={{ boxShadow: '0px 2px 5px 0px rgba(20, 88, 201, 0.17), 0px -2px 0.3px 0px rgba(14, 56, 125, 0.18) inset, 0px 2px 1px 0px rgba(255, 255, 255, 0.22) inset' }}
                    >
                        <img src="/assets/sendIcon.svg" className="max-w-5 max-h-5" alt="Send Icon" />
                    </button>
                </form>
            </div>
            <div className="w-full max-w-screen-lg mx-auto mt-10 md:mt-20">
                <h1 className="text-2xl md:text-3xl font-semibold mb-2 md:mb-4">Ваши желаемые позиции</h1>
                <PositionTable data={positions} setPositions={setPositions} />
            </div>
        </div>
    );
}
