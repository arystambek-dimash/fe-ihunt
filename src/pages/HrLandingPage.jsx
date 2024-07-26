import {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import HALO from "vanta/dist/vanta.halo.min";
import {useAuth} from "../context/AuthContext";
import AOS from 'aos';
import 'aos/dist/aos.css';

const HiringRecruiterLandingPage = () => {
    const {getIsAuthenticated, getIsHr} = useAuth();
    const vantaRef = useRef(null);
    const [faq, setFaq] = useState([
        {
            question: 'Как начать?',
            answer: `
        <ul>
          <li>Сперва нужно создать аккаунт.
            <ul>
              <li>Чтобы создать аккаунт, нажмите "Начать" или перейдите по следующей ссылке: 
                <a href="/hr/sign-up" title="" class="text-blue-600 transition-all duration-200 hover:underline">Регистрация</a>.
              </li>
            </ul>
          </li>
          <li>Затем создайте вопросы для собеседования.</li>
          <li>Поделитесь ссылкой для собеседования и получите результаты сразу.</li>
        </ul>`,
            open: false
        },
        {
            question: 'Что такое I\'Hunt интервью?',
            answer: 'I\'Hunt интервью - это платформа, которая помогает вам с собеседованием. ИИ будет за вас проводить интервью, и всё это работает автономно😎.',
            open: false
        },
        {
            question: 'Как я могу изменить свой профиль?',
            answer: 'Чтобы изменить свой профиль, войдите в свой аккаунт и перейдите в раздел "Профиль". Здесь вы можете привязать свои аккаунты HeadHunter и LinkedIn, загрузить новое фото и изменить входные данные.',
            open: false
        },
        {
            question: 'Как работает система интервью?',
            answer: 'Система интервью I\'Hunt использует искусственный интеллект для проведения интервью. Вы создаете вопросы, делитесь ссылкой с кандидатом, и ИИ проводит интервью, собирая и анализируя ответы кандидата.',
            open: false
        },
        {
            question: 'Как я могу получить доступ к своим результатам?',
            answer: 'Чтобы получить доступ к результатам, войдите в свой аккаунт и перейдите в раздел "Результаты". Здесь вы сможете просмотреть все проведенные интервью и их результаты.',
            open: false
        },
        {
            question: 'Есть ли поддержка на других языках?',
            answer: 'В настоящее время платформа I\'Hunt поддерживает только русский и английский язык. Однако мы работаем над добавлением поддержки других языков в ближайшем будущем.',
            open: false
        }
    ]);

    const toggleFaq = (index) => {
        setFaq(faq.map((item, i) => {
            if (i === index) {
                item.open = !item.open;
            } else {
                item.open = false;
            }

            return item;
        }));
    }

    useEffect(() => {
        const vantaEffect = HALO({
            el: "#vanta",
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xe81359, // Your specified color
            backgroundColor: 0x1f1437 // Your specified background color
        });

        AOS.init({duration: 1000});

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);

    useEffect(() => {
        console.log('Landing page - isAuthenticated:', getIsAuthenticated(), 'isHr:', getIsHr());
    }, [getIsAuthenticated, getIsHr]);

    const redirectUrl = (getIsAuthenticated() && getIsHr()) ? '/hr/main' : '/hr/login';

    return (
        <div>
            <div
                className="flex overflow-hidden relative flex-col justify-center items-start px-16 py-20 mt-6 w-full min-h-[636px] max-md:px-5 max-md:max-w-full"
                ref={vantaRef}
                style={{position: "relative", zIndex: 0}}
            >
                <div
                    className="object-cover absolute inset-0 size-full"
                    id="vanta"
                    style={{width: "100%", height: "100%", zIndex: -1}}
                ></div>
                <div className="fle  flex-col px-5 max-w-[1000px]">
                    <div
                        className="w-[80%] text-white font-bold text-5xl leading-[62px] max-md:max-w-full max-md:text-4xl max-md:leading-[53px]"
                    >
                        I'Hunt - нанимай своего первого сотрудника
                    </div>
                    <div className="mt-12 w-full text-gray-200 leading-7 max-md:mt-10 max-md:max-w-full">
                        Сотрудники уже ждут тебя
                    </div>
                    <a href="/coming-soon" className="w-[250px]">
                        <div
                            className="justify-center font-bold text-white items-center text-center p-4 mt-11 max-w-full text-lg leading-6 whitespace-nowrap bg-[#e81359] rounded-xl w-[250px] max-md:px-5 max-md:mt-10"
                        >
                            Начать
                        </div>
                    </a>
                </div>
            </div>
            <div className="flex flex-col px-5" data-aos="fade-up">
                <section className="py-16 sm:py-24 lg:py-32 my-10">
                    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                                Как начать поиск сотрудников?
                            </h2>
                            <p className="mt-6 text-lg leading-7 text-gray-600">
                                Следуйте этим шагам, чтобы быстро найти новых сотрудников.
                            </p>
                        </div>
                        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:gap-16">
                            <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-lg" data-aos="fade-up"
                                 data-aos-delay="200">
                                <h3 className="text-xl font-semibold text-gray-900">01. Зарегистрируйтесь</h3>
                                <p className="mt-4 text-gray-600">И получите доступ ко всем услугам iamhunt.com.</p>
                            </div>
                            <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-lg" data-aos="fade-up"
                                 data-aos-delay="400">
                                <h3 className="text-xl font-semibold text-gray-900">02. Создайте интервью и вопросы</h3>
                                <p className="mt-4 text-gray-600">Поделитесь ссылкой на интервью, чтобы ИИ мог проводить
                                    собеседования с кандидатами.</p>
                            </div>
                            <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-lg" data-aos="fade-up"
                                 data-aos-delay="600">
                                <h3 className="text-xl font-semibold text-gray-900">03. Выбирайте лучших</h3>
                                <p className="mt-4 text-gray-600">Из тех, кто уже хочет у вас работать.</p>
                            </div>
                        </div>
                        <div className="mt-12 text-center">
                            <a
                                href="/hr/login"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-black rounded-lg custom-hover"
                                data-aos="fade-up" data-aos-delay="800"
                            >
                                Начать подбор на iamhunt.com
                            </a>
                        </div>
                    </div>
                </section>
            </div>
            <section className="py-10 bg-gray-50 sm:py-16 lg:py-24 my-10" data-aos="fade-up">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                            Часто Задаваемые вопросы
                        </h2>
                    </div>
                    <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
                        {faq.map((item, index) => (
                            <div
                                key={index}
                                className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50"
                                data-aos="fade-up"
                                data-aos-delay={`${200 + index * 200}`}
                            >
                                <button
                                    type="button"
                                    className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                                    onClick={() => toggleFaq(index)}
                                >
                                    <span className="flex text-lg font-semibold text-black"> {item.question} </span>
                                    <svg
                                        className={`w-6 h-6 text-gray-400 ${item.open ? 'rotate-180' : ''}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                <div className={`${item.open ? 'block' : 'hidden'} px-4 pb-5 sm:px-6 sm:pb-6`}>
                                    <p dangerouslySetInnerHTML={{__html: item.answer}}></p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-gray-600 text-base mt-9">
                        Не нашли ответ, который ищете?{' '}
                        <a
                            href="#contact-section"
                            title=""
                            className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
                        >
                            Свяжитесь с нашей службой поддержки
                        </a>
                    </p>
                </div>
            </section>
            <div className="flex justify-center items-center mt-28" id="contact-section">
                <div className="flex flex-col w-full max-w-3xl px-5 py-10">
                    <div className="text-center">
                        <h3 className="text-4xl font-bold leading-10 text-black">
                            Свяжитесь с нами
                        </h3>
                        <p className="mt-6 text-lg leading-7 text-neutral-500">
                            Напишите свой email, и мы свяжемся с вами.
                        </p>
                    </div>
                    <form className="mt-8">
                        <div className="flex flex-col gap-5">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="px-4 py-3 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <button
                                type="submit"
                                className="w-full px-6 py-3 text-lg font-medium text-white bg-black rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Отправить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HiringRecruiterLandingPage;
