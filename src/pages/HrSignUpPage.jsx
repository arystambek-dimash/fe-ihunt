import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';
import axios from 'axios';
import Modal from 'react-modal';

const HrSignUpPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState('https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const vantaRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const vantaEffect = NET({
            el: vantaRef.current,
            THREE: THREE,
            color: 0x1f1f1f,
            backgroundColor: 0xffffff,
            points: 10,
            maxDistance: 20,
            spacing: 15,
        });

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
            setProfileImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('email', email);
            formData.append('password', password);
            if (profileImage) {
                formData.append('profileImage', profileImage);
            }

            const response = await axios.post('https://ihunt.azurewebsites.net/api/v1/users/hr/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccessMessage('Registration successful. Check email to verify your email.');
            setError('');
            setIsModalOpen(true);
        } catch (err) {
            console.log(err.response);
            const statusCode = err.response && err.response.status;
            if (statusCode === 409) {
                setError('Registration failed. User with such email already exists.');
            } else if (statusCode === 500) {
                setError('Registration failed. Internal server error.');
            } else {
                setError('Registration failed. Please try again.');
            }
            setIsErrorModalOpen(true);
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/hr/login');
    };

    const closeErrorModal = () => {
        setIsErrorModalOpen(false);
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
        },
        overlay: {
            zIndex: 999,
        },
    };

    return (
        <div ref={vantaRef} className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="mx-auto max-w-md space-y-6 py-12 px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-md mb-32">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Создать аккаунт для Менеджера найма</h1>
                </div>
                <form className="grid gap-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="first-name"
                            >
                                Имя
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="first-name"
                                placeholder="Димаш"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="last-name"
                            >
                                Фамилия
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="last-name"
                                placeholder="Арыстамбек"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="email"
                        >
                            Электронная почта
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="email"
                            placeholder="m@example.com"
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="password"
                        >
                            Пароль
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="password"
                            required
                            type="password"
                            value={password}
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="profile-image"
                        >
                            Фото профиля
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="profile-image"
                                type="file"
                                onChange={handleImageChange}
                            />
                            <div className="overflow-hidden rounded-full">
                                <img
                                    src={profileImageUrl}
                                    alt="Фото профиля"
                                    width="64"
                                    height="64"
                                    className="aspect-square object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="items-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <p className="text-muted-foreground">
                            Уже есть аккаунт?{' '}
                            <a className="font-medium underline underline-offset-4" href="/hr/login">
                                Войти
                            </a>
                        </p>
                    </div>
                </form>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Email Verification"
                style={modalStyles}
            >
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold mb-4">Подтвердите свой адрес электронной почты</h2>
                    <p className="text-lg">Мы отправили вам электронное письмо с подтверждением. Пожалуйста, проверьте
                        свою почту и следуйте инструкциям, чтобы завершить регистрацию.</p>
                    <button
                        className="mt-6 items-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                        onClick={closeModal}
                    >
                        Понятно
                    </button>
                </div>
            </Modal>
            <Modal
                isOpen={isErrorModalOpen}
                onRequestClose={closeErrorModal}
                contentLabel="Registration Error"
                style={modalStyles}
            >
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold mb-4">Ошибка регистрации</h2>
                    <p className="text-lg">{error}</p>
                    <button
                        className="mt-6 items-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                        onClick={closeErrorModal}
                    >
                        Понятно
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default HrSignUpPage;
