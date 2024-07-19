import React, {useState} from 'react';
import api from "../services/api";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
};

const PositionTable = ({data, setPositions}) => {
    const [visibleRow, setVisibleRow] = useState(null);

    const handleDelete = async (id) => {
        try {
            const response = await api.delete(`/vacancies/positions/${id}`);
            console.log('Delete response:', response.data);
            setPositions(data.filter((item) => item._id !== id));
        } catch (error) {
            console.error('Error deleting position:', error.response ? error.response.data : error.message);
        }
    };

    const handlePause = async (id) => {
        try {
            const newStatus = data.find((item) => item._id === id).status === "Paused" ? "Active" : "Paused";
            const response = await api.patch(`/vacancies/positions/${id}/status`, {status: newStatus});
            console.log('Pause response:', response.data);
            setPositions(data.map((item) => item._id === id ? {...item, status: newStatus} : item));
        } catch (error) {
            console.error('Error updating position status:', error.response ? error.response.data : error.message);
        }
    };

    const toggleRowVisibility = (index) => {
        setVisibleRow(visibleRow === index ? null : index);
    };

    if (!Array.isArray(data)) {
        return <p>No data available</p>;
    }

    return (
        <div className="max-w-full mx-auto bg-white shadow-md rounded-md overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
                <thead>
                <tr className="w-full border-b">
                    <th className="py-2 px-4 text-left text-sm sm:text-base">Введенный позиции</th>
                    <th className="py-2 px-4 text-left text-sm sm:text-base">Статус</th>
                    <th className="py-2 px-4 text-left text-sm sm:text-base">Дата</th>
                    <th className="py-2 px-4 text-left text-sm sm:text-base"></th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <React.Fragment key={index}>
                        <tr className="border-b">
                            <td className="py-2 px-4">
                                <div className="flex flex-col" onClick={() => toggleRowVisibility(index)}>
                                    <span
                                        className="block sm:hidden font-medium text-sm cursor-pointer">{item.position.length > 5 ? `${item.position.slice(0, 5)}...` : item.position}</span>
                                    <span
                                        className="hidden sm:block font-medium text-sm sm:text-base cursor-pointer">{item.position}</span>
                                </div>
                            </td>
                            <td className="py-2 px-4">
                                    <span
                                        className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${item.status === 'Paused' ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-500'}`}>
                                        {item.status}
                                    </span>
                            </td>
                            <td className="py-2 px-4 text-sm sm:text-base">
                                <span
                                    className="block sm:hidden">{item.date ? formatDate(item.date).slice(0, 5) + '...' : '--'}</span>
                                <span className="hidden sm:block">{item.date ? formatDate(item.date) : '--'}</span>
                            </td>
                            <td className="py-2 px-4 flex items-center space-x-2">
                                <button className="text-gray-500 hover:text-red-500"
                                        onClick={() => handleDelete(item._id)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 sm:h-6 sm:w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                                <button
                                    className={`text-gray-500 hover:text-${item.status === 'Paused' ? 'green' : 'blue'}-500`}
                                    onClick={() => handlePause(item._id)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 sm:h-6 sm:w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        {item.status === 'Paused' ? (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 3l14 9-14 9V3z"
                                            />
                                        ) : (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10 9v6m4-6v6m-9 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        )}
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        {visibleRow === index && (
                            <tr className="border-b">
                                <td className="py-2 px-4 col-span-4" colSpan={4}>
                                    <div className="flex flex-col">
                                        <span
                                            className="font-medium text-sm sm:text-base">Позиция: {item.position}</span>
                                        <span
                                            className="font-medium text-sm sm:text-base">Время: {item.date ? formatDate(item.date) : '--'}</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PositionTable;