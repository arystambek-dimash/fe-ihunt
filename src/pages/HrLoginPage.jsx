import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';
import axios from 'axios';
import {useAuth} from '../context/AuthContext';

const HrLoginPage = () => {
    const vantaRef = useRef(null);
    const navigate = useNavigate();
    const {login} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
            const response = await axios.post('http://localhost:8000/api/v1/users/hr/login', {
                email,
                password
            });
            const {accessToken, refreshToken} = response.data.tokens || {};
            if (accessToken && refreshToken) {
                login(accessToken, refreshToken, true); // Pass true for isHr
                console.log('Login successful, tokens saved. Navigating to profile...');
                navigate('/hr/profile');
            } else {
                throw new Error('Tokens not found in response');
            }
        } catch (err) {
            setError('Invalid email or password');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div ref={vantaRef} className="flex min-h-[100dvh] justify-center bg-background px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md mt-28 space-y-8">
                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
                        Войдите в свой аккаунт Менеджера
                    </h2>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div className="space-y-4">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                                    htmlFor="email">
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
                                    htmlFor="password">
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
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a className="font-medium text-primary hover:text-primary/80" href="#" rel="ugc">
                                    Забыли пароль?
                                </a>
                            </div>
                        </div>
                        <div>
                            <button
                                className="items-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Войти'}
                            </button>
                        </div>
                        <p className="mt-2 text-center text-sm text-muted-foreground">
                            Или{' '}
                            <a className="font-medium text-primary hover:text-primary/80" href="/hr/sign-up" rel="ugc">
                                создайте новый аккаунт
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HrLoginPage;
