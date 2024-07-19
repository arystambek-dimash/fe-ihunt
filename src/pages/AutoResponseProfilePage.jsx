import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useUser} from '../hooks/useUser';

const AutoResponseProfilePage = () => {
    const {user, error, isLoading, updateProfile} = useUser();
    const [profileImage, setProfileImage] = useState('');
    const [newProfileImage, setNewProfileImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) {
            setProfileImage(user.profileImage);
        }
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading profile. Please try again.</div>;
    }

    const handleImageChange = (e) => {
        if (!isEditing) return;

        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
            setNewProfileImage(file);
        }
    };

    const handleSaveClick = () => {
        const formData = new FormData();
        if (newProfileImage) {
            formData.append('profileImage', newProfileImage);
        }
        updateProfile(formData, {
            onSuccess: () => {
                setNewProfileImage(null);
                setIsEditing(false);
            }
        });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    return (
        <div className="mt-20 mx-auto flex flex-col items-center space-y-10 w-11/12 max-w-4xl">
            <div className="flex flex-col sm:flex-row justify-between w-full items-center gap-4 sm:gap-0">
                <div className="relative flex gap-5 items-center">
                    <div className="relative">
                        <img
                            src={profileImage}
                            alt="Profile"
                            className={`rounded-full w-24 h-24 object-cover border-4 border-gray-200 shadow-lg ${isEditing ? 'brightness-50' : ''}`}
                        />
                        {isEditing && (
                            <label htmlFor="file-input">
                                <span
                                    className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 hover:opacity-100">
                                    <i className="fas fa-pencil-alt text-xl"></i>
                                </span>
                            </label>
                        )}
                        <input
                            id="file-input"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
                {isEditing ? (
                    <button
                        className="px-8 py-3 text-white rounded-lg bg-red-500 hover:bg-red-600 transition-all duration-300 shadow-md"
                        onClick={handleSaveClick}
                    >
                        Save
                    </button>
                ) : (
                    <button
                        className="px-8 py-3 text-white rounded-lg bg-black hover:bg-gray-800 transition-all duration-300 shadow-md"
                        onClick={handleEditClick}
                    >
                        Edit
                    </button>
                )}
            </div>
            <div
                className="flex flex-col sm:flex-row w-full justify-between items-center p-5 gap-4 sm:gap-0 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col items-center sm:items-start">
                    <p className="font-semibold text-gray-700">Email</p>
                    <div className="text-center w-52 flex gap-2">
                        <div>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                    </div>
                </div>
                <div className="text-center sm:text-start w-52">
                    <p className="font-semibold text-gray-700">HeadHunter</p>
                    {user.hasHHAccount ? (
                        <p className="mt-2 px-4 py-2 bg-green-400 text-white rounded-md shadow-md">
                            Connected
                        </p>
                    ) : (
                        <Link
                            to="https://hh.ru/oauth/authorize?response_type=code&client_id=S0CP5DT8EU5QON7HMUAG46EULGBDA0CKR9L9MLS42163Q75S5096VB6ASMRLO958"
                        >
                            <button
                                className="mt-2 px-4 py-2 bg-red-400 text-white rounded-md shadow-md hover:bg-red-500 transition-all duration-300">
                                Connect HeadHunter
                            </button>
                        </Link>
                    )}
                </div>
                <div className="text-center sm:text-start w-52">
                    <p className="font-semibold text-gray-700">Linkedin</p>
                    {user.hasLinkedinAccount ? (
                        <p className="mt-2 px-4 py-2 bg-green-400 text-white rounded-md shadow-md">
                            Connected
                        </p>
                    ) : (
                        <Link
                            to="http://localhost:8000/api/v1/networks/linkedin"
                        >
                            <button
                                className="mt-2 px-4 py-2 bg-red-400 text-white rounded-md shadow-md hover:bg-red-500 transition-all duration-300">
                                Connect Linkedin
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AutoResponseProfilePage;
