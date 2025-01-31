import React, { useState } from 'react';
import { Bell, Settings, User, Home, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
    const navigate = useNavigate();
    const handleNotificationsClick = () => {
        navigate("/notifications");
      };
    
      const handleSettingsClick = () => {
        navigate("/settings");
      };
    
      const handleProfileClick = () => {
        navigate("/profile");
      };
      const handleHomeClick = () => {
        navigate("/dashboard");
      };
    const [notifications] = useState([
        { id: 1, message: "Hi Pamela, your 'History Report' task is scheduled today from 8:00 to 10:00. Good luck with your session!", timeAgo: "7 days ago" },
        { id: 2, message: "Hi Pamela, your 'History Report' task is scheduled today from 8:00 to 10:00. Good luck with your session!", timeAgo: "7 days ago" },
        { id: 3, message: "Hi Pamela, your 'Seminar Outline' task is scheduled today from 17:00 to 18:00. Have a successful lesson!", timeAgo: "5 days ago" },
        { id: 4, message: "Hi Pamela, your 'Attendance Sheet' task is scheduled today from 11:30 to 12:00. Hope you have a great session!", timeAgo: "7 days ago" },
        { id: 5, message: "Hi Pamela, your 'Classroom Report' task is scheduled today from 17:00 to 18:00. Have a productive time!", timeAgo: "11 days ago" },
        { id: 6, message: "Hi Pamela, your 'PowerPoint Presentation' task is scheduled today from 14:00 to 15:00. Enjoy your time planning!", timeAgo: "15 days ago" },
        { id: 7, message: "Hi Pamela, your 'Activity Sheet' task is scheduled today from 16:30 to 17:30. Looking forward to seeing your results!", timeAgo: "1 month ago" },
        { id: 8, message: "Hi Pamela, your 'Visual Aids' task is scheduled today from 18:00 to 20:00. Hope it goes smoothly!", timeAgo: "1 month ago" }
    ]);

    const [activeTab, setActiveTab] = useState('all');

    return (
        <div className="flex h-screen bg-gradient-to-b from-blue-500 to-blue-400">
            {/* Sidebar */}
            <div className="w-64 p-6 flex flex-col">
                {/* Logo */}
                <div className="flex items-center mb-8">
                    <span className="text-2xl font-bold text-white">TEACH</span>
                </div>

                {/* Search */}
                <div className="relative mb-8">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input 
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-blue-600/30 text-white placeholder-gray-300 focus:outline-none"
                    />
                </div>

                {/* Navigation */}
                <nav className="flex-1">
                    <div className="flex flex-col space-y-2">
                        <div 
                            className="flex items-center text-white p-3 rounded-lg hover:bg-white/10 cursor-pointer"
                            onClick={() => navigate('/dashboard')}
                        >
                            <Home className="h-5 w-5 mr-3" />
                            <span>Home</span>
                        </div>
                        <div 
                            className="flex items-center text-white p-3 rounded-lg bg-white/10 cursor-pointer"
                            onClick={() => navigate('/notifications')}
                        >
                            <Bell className="h-5 w-5 mr-3" />
                            <span>Notifications</span>
                        </div>
                        <div 
                            className="flex items-center text-white p-3 rounded-lg hover:bg-white/10 cursor-pointer"
                            onClick={() => navigate('/settings')}
                        >
                            <Settings className="h-5 w-5 mr-3" />
                            <span>Settings</span>
                        </div>
                    </div>
                </nav>

                {/* Profile */}
                <div className="flex items-center mt-auto cursor-pointer" onClick={() => navigate('/profile')}>
                    <img 
                        src="/api/placeholder/40/40"
                        alt="Profile"
                        className="w-10 h-10 rounded-full bg-gray-300"
                    />
                    <div className="ml-3 text-white">
                        <div className="font-medium">Pamela Golosinda</div>
                        <div className="text-sm text-gray-300">Profile</div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 rounded-tl-[2.5rem] p-8 relative">
                {/* Breadcrumb */}
                <div className="flex items-center mb-6 text-gray-600">
                    <Home className="h-4 w-4 mr-2" />
                    <span className="mr-2" onClick={handleHomeClick}>Home</span>
                    <span className="mx-2">/</span>
                    <span>Notifications</span>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold mb-8">Notifications</h1>

                {/* Tabs and Mark all as read */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-2">
                        <button
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                activeTab === 'all'
                                    ? 'bg-blue-600 text-white'
                                    : 'hover:bg-gray-100'
                            }`}
                            onClick={() => setActiveTab('all')}
                        >
                            All
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                activeTab === 'unread'
                                    ? 'bg-blue-600 text-white'
                                    : 'hover:bg-gray-100'
                            }`}
                            onClick={() => setActiveTab('unread')}
                        >
                            Unread
                        </button>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Mark all as read
                    </button>
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="flex items-start gap-4 bg-white p-6 rounded-xl hover:shadow-lg transition-shadow"
                        >
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 via-blue-500 to-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-800 mb-1">{notification.message}</p>
                                <p className="text-gray-500 text-sm">
                                    {notification.timeAgo}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Icons */}
                <div className="absolute top-8 right-8 flex items-center space-x-4">
                     <Bell 
                       className="h-6 w-6 text-gray-600 cursor-pointer" 
                       onClick={handleNotificationsClick} 
                    />
                     <Settings 
                       className="h-6 w-6 text-gray-600 cursor-pointer" 
                       onClick={handleSettingsClick} 
                    />
                     <User 
                       className="w-10 h-10 text-gray-600 cursor-pointer" 
                       onClick={handleProfileClick} 
                    />
                </div>

            </main>
        </div>
    );
};

export default Notifications;