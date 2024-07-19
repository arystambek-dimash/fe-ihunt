import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';
import axios from 'axios';
import Modal from 'react-modal';

const AutoResponseSignUpPage = () => {
    const vantaRef = useRef(null);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    useEffect(() => {
        let vantaEffect;
        if (vantaRef.current) {
            vantaEffect = NET({
                el: vantaRef.current,
                THREE: THREE,
                color: 0x1f1f1f,
                backgroundColor: 0xffffff,
                points: 10,
                maxDistance: 20,
                spacing: 15,
            });
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/auto-response/register', { email, password });
            setSuccessMessage('Registration successful. Check email to verify your email.');
            setError('');
            setIsModalOpen(true);
            console.log(response.data);
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
        navigate('/login');
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
        <div ref={vantaRef} className="flex min-h-screen justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md mt-28 space-y-8">
                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
                        Создать аккаунт для Авто отклик AI
                    </h2>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div className="space-y-4">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                                    htmlFor="email"
                                >
                                    Адрес электронной почты
                                </label>
                                <input
                                    className="h-10 rounded-md text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 relative block w-full appearance-none rounded-t-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                                    id="email"
                                    autoComplete="email"
                                    required
                                    placeholder="Адрес электронной почты"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-4">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                                    htmlFor="password"
                                >
                                    Пароль
                                </label>
                                <input
                                    className="h-10 rounded-md text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 relative block w-full appearance-none rounded-b-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                                    id="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="Пароль"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div>
                            <button
                                className="items-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                            </button>
                        </div>
                        <p className="mt-2 text-center text-sm text-muted-foreground">
                            Уже есть аккаунт?{' '}
                            <a className="font-medium text-primary hover:text-primary/80" href="/auto-response/login" rel="ugc">
                                Войти
                            </a>
                        </p>
                    </form>
                </div>
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

export default AutoResponseSignUpPage;