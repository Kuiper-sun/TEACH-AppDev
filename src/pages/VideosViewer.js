import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Bell, Home, Settings, Search, Download, PlayCircle } from 'lucide-react';


const VideosViewer = () => {
    const { videoId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (videoId) {
            console.log(`Fetching data for video: ${videoId}`);
            // Fetch video details from API
        }
    }, [videoId]);

    return (
        <div className="flex h-screen bg-blue-400">
            {/* Sidebar */}
            <div className="w-80 p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-center mb-6">
                        <div className="text-white text-xl font-bold">TEACH</div>
                    </div>

                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-blue-500/30 text-white placeholder-gray-300"
                        />
                    </div>

                    <nav className="space-y-2">
                        <div
                            className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer"
                            onClick={() => navigate('/dashboard')}
                        >
                            <Home className="h-5 w-5 mr-3" />
                            <span>Home</span>
                        </div>
                        <div
                            className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer"
                            onClick={() => navigate('/notifications')}
                        >
                            <Bell className="h-5 w-5 mr-3" />
                            <span>Notifications</span>
                        </div>
                        <div
                            className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer"
                            onClick={() => navigate('/settings')}
                        >
                            <Settings className="h-5 w-5 mr-3" />
                            <span>Settings</span>
                        </div>
                    </nav>
                </div>

                <div
                    className="flex items-center p-2 text-white cursor-pointer"
                    onClick={() => navigate('/profile')}
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
                    <span className="mr-2 cursor-pointer hover:text-blue-600" onClick={() => navigate('/dashboard')}>Home</span>
                    <span className="mx-2">/</span>
                    <span className="mr-2 cursor-pointer hover:text-blue-600" onClick={() => navigate('/resources')}>Resources</span>
                    <span className="mx-2">/</span>
                    <span className="mr-2 cursor-pointer hover:text-blue-600" onClick={() => navigate('/videos')}>Videos</span>
                    <span className="mx-2">/</span>
                    <span>{`Video ${videoId}`}</span>
                </div>

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Video {videoId}</h1>
                    <button
                        className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
                        onClick={() => console.log('Download clicked')}
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                    </button>
                </div>

                {/* Video Player */}
                <div className="flex flex-col items-center">
                    <div className="w-full max-w-4xl bg-black shadow-lg rounded-lg overflow-hidden mb-6">
                        {/* Replace this with actual video player implementation */}
                        <div className="relative aspect-video bg-black">
                            <img
                                src="/api/placeholder/1280/720"
                                alt="Video player"
                                className="w-full h-full object-contain"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <PlayCircle className="h-24 w-24 text-white opacity-80" />
                            </div>
                        </div>
                    </div>

                    {/* Video Information */}
                    <div className="w-full max-w-4xl">
                        <h2 className="text-xl font-semibold mb-2">Video Title</h2>
                        <p className="text-gray-600">Subject: Mathematics</p>
                        <p className="text-gray-600">Duration: 15:30</p>
                    </div>
                </div>
            </div>

            {/* Top right icons */}
            <div className="absolute top-6 right-6 flex items-center space-x-4">
                <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
                <Settings className="h-6 w-6 text-gray-600 cursor-pointer" />
                <div className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer" onClick={() => navigate('/profile')} />
            </div>
        </div>
    );
};

export default VideosViewer;