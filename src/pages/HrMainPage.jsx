import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import api from "../services/api";
import PositionTable from "../components/PositionTable";

const HrMainPage = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                const response = await api.get('/interviews');
                setInterviews(response.data.interviews);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchInterviews();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="flex-grow p-8 ">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700">Interviews</h2>
                    <Link to="/create-interview">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Create Interview
                        </button>
                    </Link>
                </div>
                <PositionTable data={interviews} setPositions={setInterviews}/>
            </main>
            <footer className="bg-white">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-gray-500">
                        © 2024 Your Company. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default HrMainPage;
