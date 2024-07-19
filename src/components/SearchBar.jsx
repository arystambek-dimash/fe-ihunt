import React from 'react';

const SearchBar = () => {
    return (
        <form className="flex gap-0 mt-9 w-full max-w-[1158px] max-md:flex-wrap max-md:max-w-full rounded-3xl shadow-lg">
            <label htmlFor="searchInput" className="sr-only">Search by Category, Company or ...</label>
            <input
                id="searchInput"
                type="text"
                className="flex-1 justify-center items-center px-4 py-3 text-sm leading-6 bg-white rounded-tl-3xl rounded-bl-3xl text-stone-300 max-md:px-5 max-md:max-w-full shadow-inner"
                placeholder="Search by Category, Company or ..."
            />
            <button type="submit" className="flex justify-center items-center bg-white rounded-tr-3xl rounded-br-3xl shadow-inner">
                <img loading="lazy"
                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/556e5feba77e18b2cfc4ddf6903fcb72d121b8d23e74ae25cfd00ba355d4ee32?apiKey=16603df5d5d944c0a2f195bca3358cf0&"
                     alt="Search"
                     className="rounded-none aspect-[1.2] w-[58px]"
                />
            </button>
        </form>
    );
};

export default SearchBar;
