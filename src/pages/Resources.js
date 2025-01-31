import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Home, Settings, Search, Upload, Settings as Gear, X } from 'lucide-react';

const Resources = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadForm, setUploadForm] = useState({
        type: '',
        title: '',
        description: '',
        fileUrl: ''
    });

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

    const handleUpload = (e) => {
        e.preventDefault();
        
        // Navigate based on resource type
        const path = `/${uploadForm.type.toLowerCase()}s`;
        
        // Here you would typically make an API call to save the file
        console.log('Uploading file:', uploadForm);
        
        // Close modal and reset form
        setIsModalOpen(false);
        setUploadForm({
            type: '',
            title: '',
            description: '',
            fileUrl: ''
        });
        
        // Navigate to the appropriate resource page
        navigate(path);
    };

    const handleInputChange = (field, value) => {
        setUploadForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

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
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Upload className="h-4 w-4" />
                            <span>Upload</span>
                        </button>

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

            {/* Upload Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-semibold">Upload Resource</h2>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleUpload} className="p-4 space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Resource Type
                                </label>
                                <select
                                    value={uploadForm.type}
                                    onChange={(e) => handleInputChange('type', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select type</option>
                                    <option value="Module">Module</option>
                                    <option value="Video">Video</option>
                                    <option value="Activity">Activity</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={uploadForm.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    placeholder="Enter title"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    value={uploadForm.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    placeholder="Enter description"
                                    rows="3"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    File
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => handleInputChange('fileUrl', e.target.files[0])}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex justify-end space-x-2 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Upload
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Resources;