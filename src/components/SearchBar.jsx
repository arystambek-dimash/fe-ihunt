import React, {useState} from 'react';
import {FaSearch} from 'react-icons/fa';

const SearchBar = ({setFilteredJobs, jobs}) => {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const filtered = jobs.filter(job =>
            job.job_name.toLowerCase().includes(inputValue.toLowerCase()) ||
            job.employer_name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredJobs(filtered);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex gap-0 mt-9 w-full max-w-[1158px] max-md:flex-wrap max-md:max-w-full rounded-3xl shadow-lg bg-white"
        >
            <label htmlFor="searchInput" className="sr-only">Search by Category, Company or ...</label>
            <input
                id="searchInput"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-4 py-3 text-sm leading-6 bg-white rounded-tl-3xl rounded-bl-3xl text-gray-700 max-md:px-5 max-md:max-w-full focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
                placeholder="Search by Category, Company or ..."
            />
            <button type="submit"
                    className="flex justify-center items-center bg-blue-500 text-white rounded-tr-3xl rounded-br-3xl px-4 py-3 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 border-l border-gray-300">
                <FaSearch className="w-5 h-5"/>
            </button>
        </form>
    );
};

export default SearchBar;
