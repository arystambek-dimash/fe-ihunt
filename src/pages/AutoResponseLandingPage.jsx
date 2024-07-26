import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min";
import { useAuth } from "../context/AuthContext";
import AOS from 'aos';
import 'aos/dist/aos.css';

const AutoResponseLandingPage = () => {
    const { getIsAuthenticated, getIsHr } = useAuth();
    const vantaRef = useRef(null);
    const [faq, setFaq] = useState([
        {
            question: 'Как начать?',
            answer: `
        <ul>
          <li>Сперва нужно создать аккаунт.
            <ul>
              <li>Чтобы создать аккаунт, нажмите "Начать" или перейдите по следующей ссылке: 
                <a href="http://localhost:3000/sign-up" title="" class="text-blue-600 transition-all duration-200 hover:underline">Регистрация</a>.
              </li>
            </ul>
          </li>
          <li>Затем укажите желаемую позицию.</li>
          <li>Если вы хотите откликнуться напрямую и отправить сопроводительное письмо, нужно привязать аккаунт HeadHunter или LinkedIn.</li>
          <li>Отклики будут отображаться здесь: 
            <a href="http://localhost:3000/responses" title="" class="text-blue-600 transition-all duration-200 hover:underline">Отклики</a>.
          </li>
        </ul>`,
            open: false
        },
        {
            question: 'Что такое I\'Hunt авто отклик?',
            answer: 'I\'Hunt авто отклик - это платформа, которая помогает вам с откликами, резюме и сопроводительными письмами. Кстати, всё это работает автономно😎.',
            open: false
        },
        {
            question: 'Как я могу изменить свой профиль?',
            answer: 'Чтобы изменить свой профиль, войдите в свой аккаунт и перейдите в раздел "Профиль". Здесь вы можете привязать свои аккаунты HeadHunter и LinkedIn и загрузить новое фото.',
            open: false
        },
        {
            question: 'Как работает система откликов?',
            answer: 'Наша система автоматически отслеживает вакансии, соответствующие вашим критериям с помощью AI, и отправляет отклики от вашего имени.',
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
        GLOBE({
            el: "#vanta",
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
        });

        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        console.log('Landing page - isAuthenticated:', getIsAuthenticated(), 'isHr:', getIsHr());
    }, [getIsAuthenticated, getIsHr]);

    const redirectUrl = (getIsAuthenticated() && !getIsHr()) ? '/auto-response/home' : '/auto-response/login';

    return (
        <div>
            <div
                className="flex overflow-hidden relative flex-col justify-center items-start px-16 py-20 mt-6 w-full min-h-[636px] max-md:px-5 max-md:max-w-full"
                ref={vantaRef}
                style={{ position: "relative", zIndex: 0 }}
            >
                <div
                    className="object-cover absolute inset-0 size-full"
                    id="vanta"
                    style={{ width: "100%", height: "100%", zIndex: -1 }}
                ></div>
                <div className="flex flex-col px-5 max-w-[1000px]">
                    <div
                        className="w-full text-white font-bold text-5xl leading-[62px] max-md:max-w-full max-md:text-4xl max-md:leading-[53px]"
                    >
                        I'Hunt - Начните получать приглашения прямо сейчас.
                    </div>
                    <div className="mt-12 w-full text-gray-200 leading-7 max-md:mt-10 max-md:max-w-full">
                        Чтобы начать нажмите кнопку
                    </div>
                    <a href={redirectUrl} className="w-[250px]">
                        <div
                            className="justify-center font-bold text-white items-center text-center p-4 mt-11 max-w-full text-lg leading-6 whitespace-nowrap bg-black rounded-xl w-[250px] max-md:px-5 max-md:mt-10"
                        >
                            Начать
                        </div>
                    </a>
                </div>
            </div>
            <div className="flex flex-col px-5">
                <div
                    className="w-full text-4xl font-semibold text-center text-black leading-[50.04px] max-md:max-w-full mt-24"
                >
                    Как работает Suhbat Авто отклик?
                </div>
                <div className="self-center mt-9 w-full max-w-[70%] max-md:max-w-full">
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-0 pt-5 pr-7 pb-8 rounded-2xl bg-gray-100 bg-opacity-50" data-aos="fade-up">
                            <img
                                loading="lazy"
                                src="./assets/image-removebg-preview (1) 1.svg"
                                className="shrink-0 max-w-full aspect-[1.11] w-[133px]"
                            />
                            <div className="flex flex-col my-auto">
                                <div className="text-emerald-400">Этап 1</div>
                                <div className="mt-3.5 text-black">Анализ пользователя</div>
                                <div className="mt-6 text-sm text-neutral-400">
                                    Создаем детальный портрет кандидата для точного поиска.
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-0 pt-5 pr-7 pb-8 rounded-2xl bg-gray-100 bg-opacity-50" data-aos="fade-up">
                            <img
                                loading="lazy"
                                src="./assets/image-removebg-preview (2) 1.svg"
                                className="shrink-0 max-w-full aspect-[1.08] w-[133px]"
                            />
                            <div className="flex flex-col my-auto">
                                <div className="text-emerald-400">Этап 2</div>
                                <div className="mt-3.5 text-black">Процесс подбора</div>
                                <div className="mt-6 text-sm text-neutral-400">
                                    Искусственный интеллект подберет каждому пользователю подходящие вакансии.
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-0 pt-5 pr-7 pb-8 rounded-2xl bg-gray-100 bg-opacity-50" data-aos="fade-up">
                            <img
                                loading="lazy"
                                src="./assets/image-removebg-preview (3) 1.svg"
                                className="shrink-0 max-w-full aspect-[2.17] w-[133px]"
                            />
                            <div className="flex flex-col my-auto">
                                <div className="text-emerald-400">Этап 3</div>
                                <div className="mt-3.5 text-black">Сопроводительное письмо и Отклик</div>
                                <div className="mt-6 text-sm text-neutral-400">
                                    Искусственный интеллект напишет письмо для каждой вакансии и отправит отклик.
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-0 pt-5 pr-7 pb-8 rounded-2xl bg-gray-100 bg-opacity-50" data-aos="fade-up">
                            <img
                                loading="lazy"
                                src="./assets/image-removebg-preview (4) 1.svg"
                                className="shrink-0 max-w-full aspect-[2.17] w-[133px]"
                            />
                            <div className="flex flex-col my-auto">
                                <div className="text-emerald-400">Этап 4</div>
                                <div className="mt-3.5 text-black">Контроль откликами</div>
                                <div className="mt-6 text-sm text-neutral-400">
                                    Можно будет посмотреть отклики, которые сделал AI.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="py-10 bg-gray-50 sm:py-16 lg:py-24 my-10">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl" data-aos="fade-up">
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
                                    <p dangerouslySetInnerHTML={{ __html: item.answer }}></p>
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
                <div className="flex justify-center gap-5 max-md:flex-col max-md:gap-0 max-w-[80%]">
                    <div className="flex flex-col w-[54%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col px-5 pt-2.5 max-md:mt-10 max-md:max-w-full">
                            <div className="text-4xl font-bold leading-10 text-black max-md:max-w-full">
                                Получить консультацию
                            </div>
                            <div className="mt-6 text-lg leading-7 text-neutral-500 max-md:max-w-full">
                                Напишите свой email, и мы свяжемся с вами.
                            </div>
                            <div className="flex gap-5 justify-between mt-7 bg-white rounded-xl border border-solid border-white border-opacity-30 max-md:flex-wrap max-md:pl-5 max-md:max-w-full">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="flex-1 px-4 py-2 text-base text-stone-500 bg-white border border-gray-300 rounded-l-xl focus:outline-none"
                                />
                                <button className="px-10 py-3.5 text-s font-medium text-white bg-stone-900 rounded-r-xl">
                                    Отправить
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[46%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                            <div className="pt-2.5 pr-6 pb-5 pl-5 rounded-2xl border border-solid bg-black bg-opacity-0 border-white border-opacity-10 max-md:pr-5 max-md:max-w-full">
                                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                    <div className="flex flex-col w-[19%] max-md:ml-0 max-md:w-full">
                                        <img
                                            loading="lazy"
                                            src="./assets/get-started-icon-frame.png"
                                            className="shrink-0 self-stretch my-auto w-20 aspect-square max-md:mt-10"
                                        />
                                    </div>
                                    <div className="flex flex-col ml-5 w-[81%] max-md:ml-0 max-md:w-full">
                                        <div className="flex flex-col grow px-2.5 pt-2.5 max-md:mt-8">
                                            <div className="text-xl font-semibold leading-8 text-black">
                                                Создайте свой аккаунт
                                            </div>
                                            <div className="mt-2.5 text-base leading-6 text-neutral-500">
                                                Ваша учетная запись и личные данные гарантированно в безопасности.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="py-1 pr-14 pl-5 mt-6 rounded-2xl border border-solid bg-black bg-opacity-0 border-white border-opacity-10 max-md:pr-5 max-md:max-w-full">
                                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                    <div className="flex flex-col w-1/5 max-md:ml-0 max-md:w-full">
                                        <img
                                            loading="lazy"
                                            src="./assets/get-started-icon-frame.svg"
                                            className="shrink-0 self-stretch my-auto w-20 aspect-square max-md:mt-10"
                                        />
                                    </div>
                                    <div className="flex flex-col ml-5 w-4/5 max-md:ml-0 max-md:w-full">
                                        <div className="flex flex-col grow px-2.5 py-1 max-md:mt-5">
                                            <div className="text-xl font-semibold leading-8 text-black">
                                                Привяжите свой hh или linkedin
                                            </div>
                                            <div className="mt-2.5 text-base leading-6 text-neutral-500">
                                                Привяжите, чтобы откликнуться напрямую
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="py-1 pr-14 pl-5 mt-6 rounded-2xl border border-solid bg-black bg-opacity-0 border-white border-opacity-10 max-md:pr-5 max-md:max-w-full">
                                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                    <div className="flex flex-col w-1/5 max-md:ml-0 max-md:w-full">
                                        <img
                                            loading="lazy"
                                            srcSet="./assets/get-started-icon-frame-1.png"
                                            className="shrink-0 self-stretch my-auto w-20 aspect-square max-md:mt-10"
                                        />
                                    </div>
                                    <div className="flex flex-col ml-5 w-4/5 max-md:ml-0 max-md:w-full">
                                        <div className="flex flex-col grow px-2.5 py-1 max-md:mt-5">
                                            <div className="text-xl font-semibold leading-8 text-black">
                                                Напишите вашу желаемую должность
                                            </div>
                                            <div className="mt-2.5 text-base leading-6 text-neutral-500">
                                                Чтобы AI нашел вашу желаемую позицию
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutoResponseLandingPage;
