import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Home, Bell, Settings, PlayCircle } from 'lucide-react';

const Videos = () => {
    const navigate = useNavigate();

    const videos = [
        { id: 1, title: "English Video 1", subject: "English", duration: "10:30" },
        { id: 2, title: "English Video 2", subject: "English", duration: "15:45" },
        { id: 3, title: "English Video 3", subject: "English", duration: "12:20" },
        { id: 4, title: "English Video 4", subject: "English", duration: "08:15" },
        { id: 5, title: "Mathematics Video 1", subject: "Mathematics", duration: "20:00" },
        { id: 6, title: "Mathematics Video 2", subject: "Mathematics", duration: "18:30" },
        { id: 7, title: "Mathematics Video 3", subject: "Mathematics", duration: "25:15" },
        { id: 8, title: "Mathematics Video 4", subject: "Mathematics", duration: "16:45" }
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
                        <div className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer" 
                             onClick={() => navigate('/dashboard')}>
                            <Home className="h-5 w-5 mr-3" />
                            <span>Home</span>
                        </div>
                        <div className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer" 
                             onClick={() => navigate('/notifications')}>
                            <Bell className="h-5 w-5 mr-3" />
                            <span>Notifications</span>
                        </div>
                        <div className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer" 
                             onClick={() => navigate('/settings')}>
                            <Settings className="h-5 w-5 mr-3" />
                            <span>Settings</span>
                        </div>
                    </nav>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer" 
                         onClick={() => navigate('/profile')}>
                        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3" />
                        <div>
                            <div className="font-medium">Pamela Golosinda</div>
                            <div className="text-sm text-gray-300">Profile</div>
                        </div>
                    </div>

                    <div className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer" 
                         onClick={() => navigate('/logout')}>
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
                        <span className="text-blue-600"> Videos</span>
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-8">Videos</h1>

                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full bg-gray-300 cursor-pointer" 
                             onClick={() => navigate('/profile')} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {videos.map(video => (
                        <div 
                            key={video.id} 
                            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer" 
                            onClick={() => navigate(`/videos/${video.id}`)}
                        >
                            <div className="relative flex justify-center items-center w-full h-32 bg-gray-50 rounded-lg mb-4">
                                <img
                                    src="/api/placeholder/320/180"
                                    alt="Video thumbnail"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                <PlayCircle className="absolute h-12 w-12 text-white opacity-80" />
                            </div>
                            <div className="text-lg font-semibold">{video.title}</div>
                            <div className="text-sm text-gray-500">{video.subject}</div>
                            <div className="text-sm text-gray-400 mt-1">{video.duration}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Videos;