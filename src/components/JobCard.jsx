import React, { useState } from 'react';
import Modal from 'react-modal';

const JobCard = ({
                     job_name,
                     salary,
                     employer_logo,
                     address,
                     cover_letter,
                     employer_name,
                     requirement,
                     responsibility,
                     url
                 }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const modalStyles = {
        content: {
            zIndex: 1000,
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '30px',
            backgroundColor: '#ffffff',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            width: '90%',
            maxWidth: '800px',
            height: 'auto',
            maxHeight: '90vh',
            overflowY: 'auto',
        },
        overlay: {
            zIndex: 999,
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
        },
    };

    return (
        <>
            <article className="flex flex-col justify-center p-4 mt-4 w-full leading-6 bg-white rounded-2xl max-w-[1158px] max-md:max-w-full">
                <div className="flex gap-3 max-md:flex-wrap">
                    <img loading="lazy" src={employer_logo} alt={`${employer_name} logo`} className="shrink-0 self-start aspect-square w-[84px]" />
                    <div className="flex flex-1 gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
                        <div className="flex flex-col px-px text-xs text-neutral-500">
                            <a href={url} target="_blank" rel="noopener noreferrer" className="text-2xl font-semibold leading-9 text-neutral-700 hover:underline">
                                {employer_name}
                            </a>
                            <p>{job_name}</p>
                        </div>
                        <div className="flex flex-col self-end mt-7">
                            <button onClick={openModal} className="mt-2 text-sm text-indigo-500">View Details</button>
                        </div>
                    </div>
                </div>
            </article>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Job Details" style={modalStyles}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-indigo-600">{job_name}</h2>
                    <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="flex items-center mb-6">
                    <img loading="lazy" src={employer_logo} alt={`${employer_name} logo`} className="w-24 h-24 rounded-full border shadow-md" />
                    <div className="ml-4">
                        <p className="text-lg font-semibold text-gray-700">{employer_name}</p>
                        <p className="text-sm text-gray-500">{address}</p>
                    </div>
                </div>
                <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(address)}`}
                    width="100%"
                    height="300"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                    className="mb-6 rounded-md"
                ></iframe>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Job Requirements</h3>
                    <p className="text-sm text-gray-600">{requirement}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Responsibilities</h3>
                    <p className="text-sm text-gray-600">{responsibility}</p>
                </div>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Cover Letter</h3>
                    <p className="text-sm text-gray-600">{cover_letter}</p>
                </div>
                <button
                    className="w-full py-2 px-4 bg-indigo-500 text-white text-sm font-medium rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                    onClick={closeModal}
                >
                    Close
                </button>
            </Modal>
        </>
    );
};

export default JobCard;
