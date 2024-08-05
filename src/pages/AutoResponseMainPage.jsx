import React, {useState, useEffect} from 'react';
import PositionTable from '../components/PositionTable';
import Countdown from '../components/Countdown';
import api from "../services/api";
import RobotLoading from "../components/RobotLoading";
import FoundJobBox from "../components/FoundJobBox";

export default function AutoResponseMainPage() {
    const [positions, setPositions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isSearchMode, setIsSearchMode] = useState(() => {
        const savedMode = sessionStorage.getItem('isSearchMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });
    const [savedVacancies, setSavedVacancies] = useState(() => {
        const parsedVacancies = sessionStorage.getItem('foundVacancies');
        return parsedVacancies ? JSON.parse(parsedVacancies) : [];
    });
    const [vacancies, setVacancies] = useState([]);
    const [jobStatus, setJobStatus] = useState(() => {
        return vacancies.length > 0 ? 'completed' : '';
    });
    const [searchHistory, setSearchHistory] = useState(() => {
        const savedHistory = sessionStorage.getItem('searchHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    });
    const [animatedJobs, setAnimatedJobs] = useState([]);

    useEffect(() => {
        fetchPositions();
    }, []);

    useEffect(() => {
        sessionStorage.setItem('isSearchMode', JSON.stringify(isSearchMode));
    }, [isSearchMode]);

    useEffect(() => {
        if (vacancies.length > 0 && animatedJobs.length === 0) {
            animateJobs(vacancies);
        }
    }, [vacancies]);

    useEffect(() => {
        if (savedVacancies.length > 0 && animatedJobs.length === 0) {
            animateJobs(savedVacancies);
        }
    }, [savedVacancies]);

    const animateJobs = (jobs) => {
        setTimeout(() => {
            jobs.forEach((_, index) => {
                setTimeout(() => {
                    setAnimatedJobs(prev => [...prev, index]);
                }, index * 100);
            });
        }, 100);
    };

    const fetchPositions = async () => {
        try {
            const response = await api.get('/vacancies/positions');
            if (response.data && Array.isArray(response.data.positions)) {
                setPositions(response.data.positions);
            } else {
                setPositions([]);
            }
        } catch (error) {
            console.error('Error fetching positions:', error);
            setPositions([]);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (isSearchMode) {
            searchByJobName(inputValue);
        } else {
            try {
                await api.post('/vacancies/positions', {position: inputValue});
                fetchPositions();
                setInputValue('');
            } catch (error) {
                console.error('Error submitting position:', error);
            }
        }
    };

    const searchByJobName = async (jobName) => {
        setJobStatus('searching');
        setAnimatedJobs([]);
        try {
            const response = await api.post('/vacancies/search-vacancies', {jobName});
            if (response.data && Array.isArray(response.data.vacancies)) {
                setVacancies(response.data.vacancies);
                setJobStatus('completed');
                sessionStorage.setItem('foundVacancies', JSON.stringify(response.data.vacancies));
                setSavedVacancies(response.data.vacancies);

                let existingHistory = false;
                searchHistory.forEach(history => {
                    if (history === jobName) {
                        existingHistory = true
                    }
                })
                if (!existingHistory) {
                    const updatedHistory = [jobName, ...searchHistory.slice(0, 1)];
                    setSearchHistory(updatedHistory);
                    sessionStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
                }
            } else {
                setVacancies([]);
                setJobStatus('completed');
                sessionStorage.removeItem('foundVacancies');
            }
        } catch (error) {
            console.error('Error starting job search:', error);
            setVacancies([]);
            setJobStatus('completed');
            sessionStorage.removeItem('foundVacancies');
        }
    };

    const deleteSearchHistoryItem = (index) => {
        const updatedHistory = searchHistory.filter((_, i) => i !== index);
        setSearchHistory(updatedHistory);
        sessionStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    };

    const handleHistoryItemClick = (item) => {
        setInputValue(item);
    };

    return (
        <div>
            <Countdown/>
            <div className="flex flex-col items-center px-4">
                <div className="mt-12 md:mt-24 w-full max-w-screen-lg mx-auto flex flex-col items-center">
                    <h1 className="mb-12 text-3xl md:text-4xl font-bold leading-tight text-center">
                        Найди свою работу в один клик.
                    </h1>
                    <div className="w-full flex justify-center mb-4">
                        <div className="inline-flex bg-gray-100 rounded-full p-1 shadow-sm w-full sm:w-auto flex-row">
                            <button
                                onClick={() => setIsSearchMode(false)}
                                className={`flex-grow px-4 sm:px-6 py-2 sm:text-sm text-[12px] rounded-full transition-colors ${
                                    !isSearchMode
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                Добавить позицию
                            </button>
                            <button
                                onClick={() => setIsSearchMode(true)}
                                className={`flex-grow px-4 sm:px-6 py-2 sm:text-sm text-[12px] rounded-full transition-colors ${
                                    isSearchMode
                                        ? 'bg-blue-500 text-white shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                Искать вакансии
                            </button>
                        </div>
                    </div>
                    <form className="w-full flex justify-center gap-2" onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            placeholder={
                                isSearchMode
                                    ? 'Введите название вакансии'
                                    : 'Напиши свой желаемый должность'
                            }
                            className="h-14 sm:h-16 w-full sm:w-3/4 text-base font-regular rounded-lg px-4"
                            style={{boxShadow: '0px 2px 4px 0px rgba(25, 33, 61, 0.08)'}}
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <button
                            type="submit"
                            className="h-14 sm:h-16 w-14 sm:w-16 bg-gray-800 flex items-center justify-center rounded-lg"
                            style={{
                                boxShadow:
                                    '0px 2px 5px 0px rgba(20, 88, 201, 0.17), 0px -2px 0.3px 0px rgba(14, 56, 125, 0.18) inset, 0px 2px 1px 0px rgba(255, 255, 255, 0.22) inset',
                            }}
                        >
                            <img
                                src={isSearchMode ? '/assets/searchIcon.png' : '/assets/sendIcon.svg'}
                                className="max-w-10 max-h-10"
                                alt={isSearchMode ? 'Search Icon' : 'Send Icon'}
                            />
                        </button>
                    </form>
                </div>
                {isSearchMode && searchHistory.length > 0 && (
                    <div className="w-full max-w-screen-lg mx-auto mt-4">
                        <div className="flex flex-wrap gap-2 sm:pl-[90px]">
                            {searchHistory.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center bg-gray-100 rounded-full px-3 py-1 cursor-pointer"
                                    onClick={() => handleHistoryItemClick(item)}
                                >
                                    <span className="mr-2">{item}</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteSearchHistoryItem(index);
                                        }}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {!isSearchMode && (
                    <div className="w-full max-w-screen-lg mx-auto mt-10 md:mt-20">
                        <h1 className="text-2xl md:text-3xl font-semibold mb-2 md:mb-4">
                            Ваши желаемые позиции
                        </h1>
                        <PositionTable data={positions} setPositions={setPositions}/>
                    </div>
                )}
                {isSearchMode && (jobStatus === 'completed' || savedVacancies.length > 0) && jobStatus !== 'searching' && (
                    <div className="w-full max-w-screen-lg mx-auto mt-10 md:mt-20">
                        <h1 className="text-2xl md:text-3xl font-semibold mb-2 md:mb-4">
                            {vacancies.length > 0 ? 'Найденные вакансии' : 'Последние найденные вакансии'}
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                            {(vacancies.length > 0 ? vacancies : savedVacancies).map((vacancy, index) => (
                                <div
                                    key={index}
                                    className={`transition-all duration-500 ease-out ${
                                        animatedJobs.includes(index)
                                            ? 'opacity-100 translate-y-0'
                                            : 'opacity-0 translate-y-10'
                                    }`}
                                >
                                    <FoundJobBox job={vacancy}/>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {isSearchMode && jobStatus === 'searching' && (
                    <div className="w-full max-w-screen-lg mx-auto mt-10 md:mt-20">
                        <RobotLoading/>
                        <div className="flex justify-center">
                            <div className="loader"></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}