import React, {useEffect, useState} from 'react';
import SearchBar from "../components/SearchBar";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";
import api from "../services/api";

const AutoResponseDashboardPage = () => {
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await api.get(`/vacancies/responses?page=${page}&limit=10`);
                setJobs(response.data.vacancies);
                setTotalPages(response.data.pages);
                setFilteredJobs(response.data.vacancies);  // Initialize filteredJobs with all jobs
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, [page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <main className="flex flex-col items-center pt-6 px-4 pb-20">
            <h1 className="mt-24 text-4xl font-bold leading-10 text-center text-black">
                Отклики отобразятся здесь
            </h1>
            <div className="mt-8 w-full max-w-4xl">
                <SearchBar setFilteredJobs={setFilteredJobs} jobs={jobs}/>
            </div>
            <div className="mt-8 w-full max-w-4xl space-y-6">
                {filteredJobs.map((job, index) => (
                    <JobCard key={index} {...job} />
                ))}
            </div>
            <div className="mt-12">
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange}/>
            </div>
        </main>
    );
};

export default AutoResponseDashboardPage;
