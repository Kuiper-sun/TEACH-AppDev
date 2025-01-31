import React from 'react';
import { useNavigate } from 'react-router-dom';

const Modules = () => {
    const navigate = useNavigate();

    const modules = [
        { id: 1, title: "English Module 1.pdf", type: "pdf" },
        { id: 2, title: "English Module 2.pdf", type: "pdf" },
        { id: 3, title: "English Module 3.pdf", type: "pdf" },
        { id: 4, title: "English Module 4.pdf", type: "pdf" },
        { id: 5, title: "Mathematics Module 1.pdf", type: "pdf" },
        { id: 6, title: "Mathematics Module 2.pdf", type: "pdf" },
        { id: 7, title: "Mathematics Module 3.pdf", type: "pdf" },
        { id: 8, title: "Mathematics Module 4.pdf", type: "pdf" }
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
                    <div className="relative mb-6">
                        <input 
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-blue-500/30 text-white placeholder-gray-300"
                        />
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
                    <div className="relative w-1/3">
                        <input 
                            type="text"
                            placeholder="Search modules..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full bg-gray-300 cursor-pointer" onClick={() => navigate('/profile')} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {modules.map(module => (
                        <div key={module.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/modules/${module.id}`)}>
                            <div className="flex justify-center items-center w-full h-32 bg-gray-50 rounded-lg mb-4">
                                <svg className="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V5..." />
                                </svg>
                            </div>
                            <div className="text-lg font-semibold">{module.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modules;
