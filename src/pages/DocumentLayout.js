import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Home, Settings, Search, Upload, User } from 'lucide-react';

const DocumentLayout = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => navigate('/dashboard');
    const handleNotificationClick = () => navigate('/notifications');
    const handleSettingsClick = () => navigate('/settings');
    const handleProfileClick = () => navigate('/profile');
    const handleDocumentClick = (docTitle) => {
        // Navigate to the appropriate document page based on title
        switch(docTitle) {
            case "Lesson Plan":
                navigate('/lesson-plan');
                break;
            case "Daily Lesson Log":
                navigate('/daily-lesson-log');
                break;
            default:
                // Handle any other cases or show an error
                console.log('Document route not yet implemented');
        }
    };

    const documents = [
        { 
            title: "Lesson Plan", 
            id: 1, 
            description: "Create and manage your lesson plans",
            gradient: "from-teal-400 via-blue-400 to-blue-500"
        },
        { 
            title: "Daily Lesson Log", 
            id: 2, 
            description: "Track daily teaching activities and progress",
            gradient: "from-blue-400 via-indigo-400 to-purple-500"
        },

    ];

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
            <div className="flex-1 bg-white rounded-tl-3xl p-6">
                {/* Breadcrumb */}
                <div className="flex items-center mb-6 text-gray-600">
                    <Home className="h-4 w-4 mr-2" />
                    <span className="mr-2 cursor-pointer hover:text-blue-600" onClick={handleHomeClick}>Home</span>
                    <span className="mx-2">/</span>
                    <span>Document Layout</span>
                </div>

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Document Layout</h1>
                    <div className="flex items-center">

                        <div className="ml-4 relative">
                            <input 
                                type="text"
                                placeholder="Search documents..."
                                className="pl-4 pr-10 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
                            />
                            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Document grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {documents.map(doc => (
                        <div 
                            key={doc.id} 
                            className="p-4 rounded-lg border hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => handleDocumentClick(doc.title)}
                        >
                            <div className={`w-full h-40 bg-gradient-to-br ${doc.gradient} rounded-lg mb-4`} />
                            <h3 className="font-medium mb-2">{doc.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{doc.description}</p>
                            <button 
                                className="w-full text-sm text-white bg-blue-600 px-3 py-2 rounded hover:bg-blue-700 transition-colors"
                            >
                                Use Document
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top right notification icon */}
            <div className="absolute top-6 right-6">
                <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
            </div>
        </div>
    );
};

export default DocumentLayout;