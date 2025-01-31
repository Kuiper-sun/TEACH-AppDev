import React from 'react';
import { useNavigate } from 'react-router-dom';

const Modules = () => {
    const navigate = useNavigate();

    const modules = [
        { id: 1, title: "ESP 1 Module 1.pdf", path: "/ESP1_Module1.pdf" },
        { id: 2, title: "Math 1 Module 2.pdf", path: "/Math1_Module2.pdf"},
        {id: 3, title: "ESP 1 Module 2.pdf", path: "/ESP1_Module2.pdf"},
        {id: 4, title: "Math 1 Module 1.pdf", path: "/Math1_Module1.pdf"},
    ];

    const skillLevels = [
        "Outstanding",
        "Very Satisfactory",
        "Satisfactory",
        "Fairly Satisfactory",
        "Did Not Meet Expectation"
    ];

    return (
        <div className="flex h-screen bg-blue-400">
            {/* Sidebar */}
            <div className="w-80 p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-center mb-6">
                        <div className="text-white text-xl font-bold">TEACH</div>
                    </div>
                    <nav className="space-y-2">
                        <div className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer" onClick={() => navigate('/dashboard')}>
                            <span>Home</span>
                        </div>
                        <div className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer" onClick={() => navigate('/notifications')}>
                            <span>Notifications</span>
                        </div>
                        <div className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer" onClick={() => navigate('/settings')}>
                            <span>Settings</span>
                        </div>
                    </nav>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer" onClick={() => navigate('/profile')}>
                        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3" />
                        <div>
                            <div className="font-medium">Pamela Golosinda</div>
                            <div className="text-sm text-gray-300">Profile</div>
                        </div>
                    </div>

                    <div className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer" onClick={() => navigate('/logout')}>
                        <span>Log Out</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white rounded-tl-3xl p-8">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <div className="text-lg text-gray-600">
                        <span className="cursor-pointer" onClick={() => navigate('/dashboard')}>Home</span> / 
                        <span className="cursor-pointer" onClick={() => navigate('/resources')}> Resources</span> / 
                        <span className="text-blue-600"> Modules</span>
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-8">Modules</h1>

                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full bg-gray-300 cursor-pointer" onClick={() => navigate('/profile')} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {modules.map(module => (
                        <div key={module.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                            {/* Thumbnail */}
                            <div className="flex justify-center items-center w-full h-32 bg-gray-50 rounded-lg mb-4">
                                <svg className="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V5..." />
                                </svg>
                            </div>

                            {/* Module Title */}
                            <a 
                                href={module.path} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-lg font-semibold text-blue-600"
                            >
                                {module.title}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modules;
