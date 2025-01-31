import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Home, Settings, Search, Upload, Settings as Gear } from 'lucide-react';

const Resources = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => navigate('/dashboard');
    const handleNotificationClick = () => navigate('/notifications');
    const handleSettingsClick = () => navigate('/settings');
    const handleProfileClick = () => navigate('/profile');

    const resources = [
        {
            id: 1,
            title: "Modules",
            viewLink: "/modules"
        },
        {
            id: 2,
            title: "Videos",
            viewLink: "/videos"
        },
        {
            id: 3,
            title: "Activities",
            viewLink: "/activities"
        }
    ];

    return (
        <div className="flex h-screen bg-blue-400">
            {/* Sidebar */}
            <div className="w-80 p-6 flex flex-col justify-between">
                {/* Top section */}
                <div>
                    {/* Logo */}
                    <div className="flex items-center mb-6">
                        <div className="text-white text-xl font-bold">TEACH</div>
                    </div>

                    {/* Search */}
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input 
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-blue-500/30 text-white placeholder-gray-300"
                        />
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        <div 
                            className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer"
                            onClick={handleHomeClick}
                        >
                            <Home className="h-5 w-5 mr-3" />
                            <span>Home</span>
                        </div>
                        <div 
                            className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer"
                            onClick={handleNotificationClick}
                        >
                            <Bell className="h-5 w-5 mr-3" />
                            <span>Notifications</span>
                        </div>
                        <div 
                            className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer"
                            onClick={handleSettingsClick}
                        >
                            <Settings className="h-5 w-5 mr-3" />
                            <span>Settings</span>
                        </div>
                    </nav>
                </div>

                {/* User profile */}
                <div 
                    className="flex items-center p-2 text-white cursor-pointer"
                    onClick={handleProfileClick}
                >
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3" />
                    <div>
                        <div className="font-medium">Pamela Golosinda</div>
                        <div className="text-sm text-gray-300">Profile</div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 bg-white rounded-tl-3xl p-8">
                {/* Breadcrumb */}
                <div className="flex items-center mb-6 text-gray-600">
                    <Home className="h-4 w-4 mr-2" />
                    <span className="mr-2 cursor-pointer hover:text-blue-600" onClick={handleHomeClick}>Home</span>
                    <span className="mx-2">/</span>
                    <span>Resources</span>
                </div>

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Resources</h1>
                    <div className="flex items-center space-x-4">

                        <div className="relative">
                            <input 
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Resource grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.map(resource => (
                        <div key={resource.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                            <div className="w-full h-48 bg-gradient-to-br from-teal-400 via-blue-500 to-blue-600 rounded-lg mb-4"></div>
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium">{resource.title}</h3>
                                <button 
                                    onClick={() => navigate(resource.viewLink)}
                                    className="px-4 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top right icons */}
            <div className="absolute top-6 right-6 flex items-center space-x-4">
                <Bell className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleNotificationClick}/>
                <Gear className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleSettingsClick}/>
                <div className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer" onClick={handleProfileClick} />
            </div>
        </div>
    );
};

export default Resources;
