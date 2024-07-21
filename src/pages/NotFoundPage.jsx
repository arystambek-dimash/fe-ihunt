import React from 'react';
import {useNavigate} from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900">404</h1>
                <p className="text-2xl text-gray-700 mt-4">Страница не найдена</p>
                <p className="text-gray-500 mt-2">Извините, но страница, которую вы ищете, не существует.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-full"
                >
                    Вернуться назад
                </button>
            </div>
        </div>
    );
};

export default NotFound;
