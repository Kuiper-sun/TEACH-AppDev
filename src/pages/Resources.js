import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Home, Settings, Search, Upload, LogOut, Settings as Gear, X } from 'lucide-react';

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

    const handleLogout = () => {
        // Clear session or authentication data (e.g., localStorage)
        localStorage.removeItem('isLoggedIn');
        // Navigate to the SignIn page
        navigate('/signin');
    };
    
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
        <div className="flex h-screen bg-gradient-to-b from-blue-500 to-blue-400">
            {/* Sidebar */}
            <div className="w-64 p-6 flex flex-col h-screen sticky top-0 justify-between">
                {/* Top section */}
                <div>
                    {/* Logo */}
                    <div className="flex items-center mb-8">
                        <img  src="/images/LogoName.png" alt="TEACH Logo" className="h-12 w-auto" />
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        <div 
                            className="flex items-center text-white p-3 rounded hover:bg-blue-500/30 cursor-pointer"
                            onClick={handleHomeClick}
                        >
                            <Home className="h-5 w-5 mr-3" />
                            <span>Home</span>
                        </div>
                        <div 
                            className="flex items-center text-white p-3 rounded hover:bg-blue-500/30 cursor-pointer"
                            onClick={handleNotificationClick}
                        >
                            <Bell className="h-5 w-5 mr-3" />
                            <span>Notifications</span>
                        </div>
                        <div 
                            className="flex items-center text-white p-3 rounded hover:bg-blue-500/30 cursor-pointer"
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
                    <img 
                        src="images/Profile.png" 
                        alt="User Profile" 
                        className="w-11 h-11 rounded-full object-cover mr-3"
                    />                    <div>
                        <div className="font-medium">Pamela Golosinda</div>
                        <div className="text-sm text-gray-300">Profile</div>
                    </div>
                </div>

                    {/* Logout Button */}
                    <div className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer" 
                         onClick={handleLogout}>
                        <LogOut className="h-5 w-5 mr-3" />
                        <span>Log Out</span>
                    </div>    
            </div>

            {/* Main content */}
            <div className="flex-1 bg-gray-50 p-8 overflow-auto">
                 {/* Breadcrumb */}
                 <div className="mb-6">
                     <div className="text-lg text-gray-600 flex items-center">
                         <Home className="h-5 w-5 mr-2 text-gray-600" />
                         <span className="cursor-pointer" onClick={() => navigate('/dashboard')}>Home</span>
                         <span className="mx-2 text-gray-600"> &gt; </span> {/* This is the '>' separator */}
                         <span className="text-blue-600"> Resources</span>
                     </div>
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