import React from 'react';


const Footer = () => {
    return (
        <div
            className="flex flex-col items-center px-16 pt-14 pb-8 w-full bg-indigo-950 mt-28 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col items-center w-full max-w-[1203px] max-md:max-w-full">
                <div className="flex gap-4 ml-14">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d896e5121f39651c0dff18f4756975383186932e2b911509bf8dde2927a6618?"
                        className="shrink-0 w-6 aspect-square"
                    />
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5bebd66ab29490d3eb20f1becfb699b7b5d5ce8f3c456bc0f2ea8ec41a6119cb?"
                        className="shrink-0 w-6 aspect-square"
                    />
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b219a2c48beff462b308042fae9bfd55d8340a6d625b6368a984aba6111497d?"
                        className="shrink-0 w-6 aspect-square"
                    />
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e506dd02a4d09f4980f802912f0569a9129c3d41b90b1cf751d0bd6edaddc15d?"
                        className="shrink-0 w-6 aspect-square"
                    />
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9941159bff7ec5dec61895af3a3755b2d69c0a4d60b4aae5757516a06189d07?"
                        className="shrink-0 w-6 aspect-square"
                    />
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d91c6ff76dfdc3f27b45b13f5dd1284860f136a3ef677830968a0683e8b364ad?"
                        className="shrink-0 w-6 aspect-square"
                    />
                </div>
                <div
                    className="shrink-0 self-stretch mt-24 h-px bg-white border border-white border-solid max-md:mt-10 max-md:max-w-full"/>
                <div className="mt-9 ml-14 text-xs font-light text-white">
                    © 2024 All Rights Reserved
                </div>
            </div>
        </div>
    )
}

export default Footer