import React, {useState} from 'react';
import Modal from 'react-modal';
import parse from 'html-react-parser';

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
            maxWidth: '600px',
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
            <article
                className="flex flex-col justify-center p-4 mt-4 w-full bg-white rounded-2xl shadow-lg max-w-[1158px] md:max-w-full">
                <div className="flex gap-3 md:flex-wrap">
                    <img loading="lazy" src={employer_logo} alt={`${employer_name} logo`}
                         className="shrink-0 self-start w-20 h-20 rounded-full border shadow-md"/>
                    <div className="flex flex-1 gap-5 justify-between md:flex-wrap md:max-w-full">
                        <div className="flex flex-col flex-1 px-px text-sm text-neutral-500">
                            <a href={url} target="_blank" rel="noopener noreferrer"
                               className="text-lg font-semibold text-neutral-700 hover:underline">
                                {employer_name}
                            </a>
                            <p className="text-gray-600">{job_name}</p>
                        </div>
                        <div className="flex flex-col justify-between text-right">
                            <p className="text-gray-700">Salary: {salary || 'undefined'}</p>
                            <button onClick={openModal} className="mt-2 text-sm text-indigo-500 hover:underline">View
                                Details
                            </button>
                        </div>
                    </div>
                </div>
            </article>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Job Details" style={modalStyles}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-indigo-600">{job_name}</h2>
                    <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="flex items-center mb-6">
                    <img loading="lazy" src={employer_logo} alt={`${employer_name} logo`}
                         className="w-16 h-16 rounded-full border shadow-md"/>
                    <div className="ml-4">
                        <p className="text-lg font-semibold text-gray-700">{employer_name}</p>
                        <p className="text-sm text-gray-500">{address}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Job Requirements</h3>
                    <div className="text-sm text-gray-600">
                        {parse(requirement.replace(/<highlighttext>/g, '<span class="highlighttext">').replace(/<\/highlighttext>/g, '</span>'))}
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Responsibilities</h3>
                    <div className="text-sm text-gray-600">
                        {parse(responsibility.replace(/<highlighttext>/g, '<span class="highlighttext">').replace(/<\/highlighttext>/g, '</span>'))}
                    </div>
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
