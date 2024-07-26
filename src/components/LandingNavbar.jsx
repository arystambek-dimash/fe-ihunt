import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const LandingNavbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    const handleLogoClick = (e) => {
        e.preventDefault();
        if (location.pathname.startsWith('/auto-response')) {
            navigate('/');
        } else if (location.pathname.startsWith('/hr')) {
            navigate('/hiring-managers');
        } else {
            navigate('/');
        }
    }

    return (
        <div className="flex flex-col pt-6 bg-white">
            <div className="flex gap-5 self-center px-5 w-full text-black max-w-[93%] max-md:flex-wrap max-md:max-w-full">
                <div className="flex-auto my-auto text-3xl font-bold">
                    <a href="#" onClick={handleLogoClick}>I'Hunt</a>
                </div>
                <div className="hidden md:flex gap-10 justify-between items-center text-lg font-medium leading-6">
                    <div className={`self-stretch my-auto ${activeLink === '/hiring-managers' ? 'active-link active' : 'active-link'}`}>
                        <Link to="/hiring-managers">Для менеджером по найму</Link>
                    </div>
                    <div className={`self-stretch my-auto ${activeLink === '/' ? 'active-link active' : 'active-link'}`}>
                        <Link to="/">Авто отклик</Link>
                    </div>
                    <div className="justify-center self-stretch px-4 py-3 text-base leading-6 text-right text-white bg-blue-400 rounded-xl border-2 border-white border-solid">
                        <Link to="/">Войти телеграм</Link>
                    </div>
                </div>
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMobileMenu} className="text-black focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="flex flex-col gap-4 mt-4 items-center md:hidden transition-all duration-300 ease-in-out bg-gray-100 p-5 rounded-lg shadow-lg">
                    <Link to="/hiring-managers" className={`w-full text-lg font-medium text-center text-gray-800 py-2 hover:bg-gray-200 rounded ${activeLink === '/hiring-managers' ? 'active-link active' : 'active-link'}`}>
                        Для менеджером по найму
                    </Link>
                    <Link to="/" className={`w-full text-lg font-medium text-center text-gray-800 py-2 hover:bg-gray-200 rounded ${activeLink === '/' ? 'active-link active' : 'active-link'}`}>
                        Авто отклик
                    </Link>
                    <Link to="/" className="w-full text-lg font-medium text-center text-white bg-blue-400 py-3 rounded-xl border-2 border-white border-solid hover:bg-blue-500">
                        Войти телеграм
                    </Link>
                </div>
            )}
        </div>
    );
}

export default LandingNavbar;
