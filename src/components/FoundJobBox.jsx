import React, {useState} from 'react';
import Modal from 'react-modal';
import {useAuth} from "../context/AuthContext";
import {useUser} from "../hooks/useUser";
import parse from 'html-react-parser';

Modal.setAppElement('#root'); // Set the app element for accessibility

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

const FoundJobBox = ({job}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [response, setResponse] = useState('');
    const {getIsAuthenticated} = useAuth();
    const {user} = useUser();

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleGenerateCoverLetter = () => {
        console.log("Generating cover letter with AI");
    };

    const handleSendResponse = () => {
        console.log("Sending response:", response);
        setResponse('');
        closeModal();
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-3">
                <img src={job.employer_logo} alt={job.job_employer_name} className="w-10 h-10 rounded-full mr-3"/>
                <div>
                    <h2 className="font-semibold text-lg">{job.job_name}</h2>
                    <p className="text-sm text-gray-600">{job.job_employer_name}</p>
                </div>
            </div>
            <p className="text-sm text-gray-700 mb-4">{job.job_description.slice(0, 70)}...</p>
            <div className="flex space-x-2">
                <button onClick={openModal} className="text-blue-500 hover:text-blue-700">
                    👁️ View Details
                </button>
                <a href={job.url} target="_blank" rel="noopener noreferrer"
                   className="text-green-500 hover:text-green-700">
                    🔗 Apply on Website
                </a>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Job Details"
                style={modalStyles}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-indigo-600">{job.job_name}</h2>
                    <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="flex items-center mb-6">
                    <img loading="lazy" src={job.employer_logo} alt={`${job.job_employer_name} logo`}
                         className="w-16 h-16 rounded-full border shadow-md"/>
                    <div className="ml-4">
                        <p className="text-lg font-semibold text-gray-700">{job.job_employer_name}</p>
                        <p className="text-sm text-gray-500">{job.job_address || 'Address not provided'}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Job Description</h3>
                    <div className="text-sm text-gray-600">
                        {parse(job.job_description)}
                    </div>
                </div>
                {getIsAuthenticated() && user.hasHHAccount && (
                    <>
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Application</h3>
                            <textarea
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                placeholder="Write your cover letter here..."
                                className="w-full p-2 border border-gray-300 rounded-md"
                                rows="4"
                            />
                        </div>
                        <div className="flex justify-end space-x-2 mb-4">
                            <button
                                onClick={handleGenerateCoverLetter}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                Generate Letter
                            </button>
                            <button
                                onClick={handleSendResponse}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Send Application
                            </button>
                        </div>
                    </>
                )}
                <button
                    className="w-full py-2 px-4 bg-indigo-500 text-white text-sm font-medium rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                    onClick={closeModal}
                >
                    Close
                </button>
            </Modal>
        </div>
    );
};

export default FoundJobBox;