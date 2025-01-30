import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Home, Settings, Search, Download, User, Printer } from 'lucide-react';

const DailyLessonLog = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => navigate('/dashboard');
    const handleNotificationClick = () => navigate('/notifications');
    const handleSettingsClick = () => navigate('/settings');
    const handleProfileClick = () => navigate('/profile');

    return (
        <div className="flex h-screen bg-blue-400">
            {/* Sidebar */}
            <div className="w-64 p-4 flex flex-col justify-between">
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
            <div className="flex-1 bg-white rounded-tl-3xl p-6 overflow-y-auto">
                {/* Breadcrumb */}
                <div className="flex items-center mb-6 text-gray-600">
                    <Home className="h-4 w-4 mr-2" />
                    <span className="mr-2 cursor-pointer hover:text-blue-600" onClick={handleHomeClick}>Home</span>
                    <span className="mx-2">/</span>
                    <span className="mr-2 cursor-pointer hover:text-blue-600" onClick={() => navigate('/document-layout')}>Document Layout</span>
                    <span className="mx-2">/</span>
                    <span>Daily Lesson Log</span>
                </div>

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold">Daily Lesson Log</h1>
                        <p className="text-gray-600 mt-1">Create Daily Lesson Log in no time! Simply enter the required information and export as a docx file—no editing or formatting needed.</p>
                    </div>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Export Layout
                        <Download className="h-4 w-4 ml-2" />
                    </button>
                </div>

                {/* Form */}
                <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
                            <input 
                                type="text"
                                placeholder="Input School"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        
                        <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
                           <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                 <option value="">Select an option</option>
                                 <option value="grade1">Grade 1</option>
                                 <option value="grade2">Grade 2</option>
                                 <option value="grade3">Grade 3</option>
                                 <option value="grade4">Grade 4</option>
                                 <option value="grade5">Grade 5</option>
                                 <option value="grade6">Grade 6</option>
                           </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
                            <input 
                                type="text"
                                placeholder="Input teacher"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Learning Area</label>
                            <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <option value="">Select an option</option>
                                <option value="">Mother Tongue</option>
                                <option value="">Filipino</option>
                                <option value="">English</option>
                                <option value="">Mathematics</option>
                                <option value="">Science</option>
                                <option value="">Araling Panlipunan</option>
                                <option value="">Edukasyon sa Pagpapakatao (ESP)</option>
                                <option value="">MAPEH</option>
                                <option value="">Edukasyong Pantahanan at Panglabuhayan (EPP)</option>
                                <option value="">Technology and Livelihood Education (TLE)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Teaching Date and Time</label>
                            <input 
                                type="text"
                                placeholder="Input teaching date and time"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quarter</label>
                            <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <option value="">Select an option</option>
                                <option value="">Quarter 1</option>
                                <option value="">Quarter 2</option>
                                <option value="">Quarter 3</option>
                                <option value="">Quarter 4</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-sm font-medium text-gray-700">MONDAY</label>
                            <button type="button" className="text-blue-600 hover:text-blue-700">
                                Add Day
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Objectives</label>
                                <textarea 
                                    placeholder="Input the objective for this lesson plan"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 mb-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                                <textarea 
                                    placeholder="Input the topic for the subject"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Learning Resources</label>
                                <textarea 
                                    placeholder="Input the topic for the subject"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Procedures</label>
                                <textarea 
                                    placeholder="Input the topic for the subject"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                                <textarea 
                                    placeholder="Input the topic for the subject"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Reflection</label>
                                <textarea 
                                    placeholder="Input the topic for the subject"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 pt-6">
                        <button type="button" className="px-4 py-2 text-gray-600 hover:text-gray-800">
                            Clear
                        </button>
                        <button type="submit" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Submit and Download
                            <Download className="h-4 w-4 ml-2" />
                        </button>
                    </div>
                </form>
            </div>

            {/* Top right icons */}
            <div className="absolute top-6 right-6 flex items-center space-x-4">
                <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
                <Printer className="h-6 w-6 text-gray-600 cursor-pointer" />
                <div className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer" onClick={handleProfileClick} />
            </div>
        </div>
    );
};

export default DailyLessonLog;