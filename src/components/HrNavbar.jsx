import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useLocation} from "react-router-dom";
import {useUser} from "../hooks/useUser";

const HiringManagersNavbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const {user, isLoading, error} = useUser();

    useEffect(() => {
        setActiveLink(location.pathname);
        setIsProfileMenuOpen(false); // Close profile menu on route change
    }, [location]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    }

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/hr/login');
    }

    const handleProfileClick = () => {
        if (window.innerWidth < 768) {
            navigate('/hr/profile');
        } else {
            toggleProfileMenu();
        }
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="flex flex-col pt-7 pb-5 bg-gray-900">
            <div
                className="flex gap-5 self-center px-5 w-full text-white max-w-[93%] max-md:flex-wrap max-md:max-w-full">
                <div className="flex-auto my-auto text-3xl font-bold">
                    <a href="/hiring-managers">I'Hunt</a>
                </div>
                <div className="hidden md:flex gap-10 justify-between items-center text-lg font-medium leading-6">
                    <div
                        className={`self-stretch my-auto ${activeLink === '/auto-response/home' ? 'active-link active' : 'active-link'}`}>
                        <Link to="/hr/main">Главная</Link>
                    </div>
                    <div className="relative">
                        <img
                            src={user.profileImage}
                            alt="avatar"
                            className="rounded-full w-[50px] h-[50px] shadow shadow-2xl cursor-pointer border-2 border-white"
                            onClick={handleProfileClick}
                        />

                        {isProfileMenuOpen && (
                            <div
                                className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                                {user ? (
                                    <>
                                        <Link to="/hr/profile">
                                            <div className="px-4 py-2 text-white hover:bg-gray-700">Профиль</div>
                                        </Link>
                                        <div className="px-4 py-2 text-white cursor-pointer hover:bg-gray-700"
                                             onClick={handleLogout}>
                                            Выйти
                                        </div>
                                    </>
                                ) : (
                                    <Link to="/login"
                                          className="block px-4 py-2 text-white hover:bg-gray-700">Login</Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div
                    className="flex flex-col gap-4 mt-4 items-center md:hidden transition-all duration-300 ease-in-out bg-gray-800 p-5 rounded-lg shadow-lg">
                    <Link to="/hr/main"
                          className={`w-full text-lg font-medium text-center text-white py-2 hover:bg-gray-700 rounded ${activeLink === '/auto-response/home' ? 'active-link active' : 'active-link'}`}>
                        Главная
                    </Link>
                    <Link to="/hr/profile"
                          className={`w-full text-lg font-medium text-center text-white py-2 hover:bg-gray-700 rounded ${activeLink === '/auto-response/profile' ? 'active-link active' : 'active-link'}`}>
                        Профиль
                    </Link>
                    <a href=""
                       className="w-full text-lg font-medium text-center text-white py-2 hover:bg-gray-700 rounded"
                       onClick={handleLogout}>
                        Выйти
                    </a>
                </div>
            )}
        </div>
    );
}

export default HiringManagersNavbar;
