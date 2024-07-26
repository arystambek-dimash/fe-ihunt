import React, { useEffect, useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const [maxVisiblePages, setMaxVisiblePages] = useState(5);

    useEffect(() => {
        const updateMaxVisiblePages = () => {
            if (window.innerWidth < 640) {
                setMaxVisiblePages(3);
            } else if (window.innerWidth < 768) {
                setMaxVisiblePages(4);
            } else {
                setMaxVisiblePages(5);
            }
        };

        updateMaxVisiblePages();
        window.addEventListener('resize', updateMaxVisiblePages);

        return () => window.removeEventListener('resize', updateMaxVisiblePages);
    }, []);

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, currentPage + Math.floor(maxVisiblePages / 2));

        if (currentPage <= Math.floor(maxVisiblePages / 2)) {
            endPage = Math.min(maxVisiblePages, totalPages);
        } else if (currentPage >= totalPages - Math.floor(maxVisiblePages / 2)) {
            startPage = Math.max(1, totalPages - (maxVisiblePages - 1));
        }

        if (startPage > 1) {
            pages.push(
                <a
                    key={1}
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onPageChange(1);
                    }}
                    className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                >
                    1
                </a>
            );
            if (startPage > 2) {
                pages.push(<span key="start-ellipsis" className="px-3 py-1">...</span>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <a
                    key={i}
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onPageChange(i);
                    }}
                    className={`px-3 py-1 rounded-md ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                >
                    {i}
                </a>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(<span key="end-ellipsis" className="px-3 py-1">...</span>);
            }
            pages.push(
                <a
                    key={totalPages}
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onPageChange(totalPages);
                    }}
                    className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                >
                    {totalPages}
                </a>
            );
        }

        return pages;
    };

    return (
        <nav className="flex justify-center items-center space-x-2 mt-6" aria-label="Pagination">
            <button
                className="flex justify-center items-center p-2 w-10 h-10 bg-white text-gray-700 rounded-md shadow-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                aria-label="Previous page"
                onClick={handlePrevious}
                disabled={currentPage === 1}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <div className="flex space-x-1">
                {renderPageNumbers()}
            </div>
            <button
                className="flex justify-center items-center p-2 w-10 h-10 bg-white text-gray-700 rounded-md shadow-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                aria-label="Next page"
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </nav>
    );
};

export default Pagination;
