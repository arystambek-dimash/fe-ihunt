import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
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
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (currentPage <= 3) {
            endPage = Math.min(maxVisiblePages, totalPages);
        } else if (currentPage >= totalPages - 2) {
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
                    className={`self-stretch my-auto ${currentPage === 1 ? 'bg-neutral-50 text-gray-950' : ''}`}
                >
                    1
                </a>
            );
            if (startPage > 2) {
                pages.push(<span key="start-ellipsis" className="self-stretch my-auto">...</span>);
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
                    className={`self-stretch my-auto transition duration-300 ease-in-out ${currentPage === i ? 'bg-neutral-50 text-gray-950' : ''}`}
                >
                    {i}
                </a>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(<span key="end-ellipsis" className="self-stretch my-auto">...</span>);
            }
            pages.push(
                <a
                    key={totalPages}
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onPageChange(totalPages);
                    }}
                    className={`self-stretch my-auto ${currentPage === totalPages ? 'bg-neutral-50 text-gray-950' : ''}`}
                >
                    {totalPages}
                </a>
            );
        }

        return pages;
    };

    return (
        <nav className="flex gap-5 justify-between mt-12 max-w-full w-[472px] max-md:flex-wrap max-md:mt-10"
             aria-label="Pagination">
            <button
                className="flex justify-center items-center p-2 w-10 h-10 bg-white transition duration-300 ease-in-out shadow-lg"
                aria-label="Previous page"
                onClick={handlePrevious}
                disabled={currentPage === 1}
            >
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/47a130f0aecd1e69fe53be1b4cf9a59172c3c10d0842d64bcbebd09b2d41c04c?apiKey=16603df5d5d944c0a2f195bca3358cf0&"
                    alt="Previous"
                    className="w-6 aspect-square"
                />
            </button>
            <div
                className="flex gap-2 justify-between items-center px-5 text-sm font-medium leading-5 text-center whitespace-nowrap text-neutral-400">
                {renderPageNumbers()}
            </div>
            <button
                className="flex justify-center items-center p-2 w-10 h-10 bg-white transition duration-300 ease-in-out shadow-lg"
                aria-label="Next page"
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9a39410369d83046250945fd6f9664e48dbfe8e10a3a7a8c7f1e67e24d31f38?apiKey=16603df5d5d944c0a2f195bca3358cf0&"
                    alt="Next"
                    className="w-6 aspect-square"
                />
            </button>
        </nav>
    );
};

export default Pagination;
