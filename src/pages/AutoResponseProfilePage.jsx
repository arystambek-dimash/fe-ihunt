import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useUser} from '../hooks/useUser';

const AutoResponseProfilePage = () => {
    const {user, error, isLoading, updateProfile} = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [profileImage, setProfileImage] = useState('');
    const [newProfileImage, setNewProfileImage] = useState(null);

    useEffect(() => {
        if (user) {
            setProfileData({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            });
            setProfileImage(user.profileImage);
        }
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading profile. Please try again.</div>;
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProfileData((prevState) => ({...prevState, [name]: value}));
    };

    const handleEditClick = () => {
        if (isEditing) {
            const formData = new FormData();
            formData.append('firstName', profileData.firstName);
            formData.append('lastName', profileData.lastName);
            formData.append('email', profileData.email);
            if (newProfileImage) {
                formData.append('profileImage', newProfileImage);
            }
            updateProfile(formData, {
                onSuccess: () => {
                    setIsEditing(false);
                },
            });
        } else {
            setIsEditing(true);
        }
    };

    const handleImageChange = (e) => {
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

    return (
        <div className="mt-20 mx-auto flex flex-col items-center space-y-10 w-11/12 max-w-4xl">
            <div className="flex flex-col sm:flex-row justify-between w-full items-center gap-4 sm:gap-0">
                <div className="relative flex gap-5 items-center">
                    <div className="relative">
                        <div
                            className="rounded-full overflow-hidden w-16 h-16 sm:w-24 sm:h-24 border-4 border-gray-200 shadow-lg">
                            <img
                                src={profileImage}
                                alt="Profile"
                                className={`object-cover w-full h-full ${isEditing ? 'brightness-50' : ''}`}
                            />
                        </div>

                        {isEditing && (
                            <>
                                <label htmlFor="file-input">
                                    <span
                                        className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 hover:opacity-100">
                                        <i className="fas fa-pencil-alt text-xl"></i>
                                    </span>
                                </label>
                                <input
                                    id="file-input"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </>
                        )}
                    </div>
                    <div className="flex flex-col h-full justify-center">
                        <p className="text-xl font-medium">
                            {profileData.firstName} {profileData.lastName}
                        </p>
                        <p className="text-base text-gray-600">
                            {user.email}
                        </p>
                    </div>
                </div>
                <button
                    className={`px-5 py-2 text-white rounded-lg sm:px-8 sm:py-3 ${isEditing ? 'bg-red-500 hover:bg-red-600' : 'bg-black hover:bg-gray-800'} transition-all duration-300 shadow-md`}
                    onClick={handleEditClick}
                >
                    {isEditing ? 'Save' : 'Edit'}
                </button>
            </div>
            <div className="w-full flex flex-col sm:flex-row justify-between gap-8 bg-white shadow-lg rounded-lg p-5">
                <div className="flex flex-col gap-4 w-full">
                    <p className="text-base font-semibold">Имя</p>
                    <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`rounded-lg text-base p-2 w-full ${!isEditing ? 'bg-gray-200' : 'bg-white border border-gray-300'} shadow-sm`}
                    />
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <p className="text-base font-semibold">Фамилия</p>
                    <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`rounded-lg text-base p-2 w-full ${!isEditing ? 'bg-gray-200' : 'bg-white border border-gray-300'} shadow-sm`}
                    />
                </div>
            </div>
            <div
                className="flex flex-col sm:flex-row w-full justify-between items-center p-5 gap-4 sm:gap-0 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col items-center sm:items-start">
                    <p className="text-base font-semibold">Электронная почта</p>
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
                            to="https://iamhunt.vercel.app/api/v1/networks/linkedin"
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
