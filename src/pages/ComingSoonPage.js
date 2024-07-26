import {Link} from "react-router-dom";

const ComingSoonPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="flex-grow p-8 text-center items-center flex flex-col">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Coming Soon!</h2>
                <p className="text-gray-500 mb-6">Stay tuned for updates.</p>
                <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="YouTube video player"
                    className="w-[500px] h-[500px] mb-6"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                <Link to="/hiring-managers">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Main Menu
                    </button>
                </Link>
            </main>
            <footer className="bg-white">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-gray-500">
                        © 2024 Your Company. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default ComingSoonPage;