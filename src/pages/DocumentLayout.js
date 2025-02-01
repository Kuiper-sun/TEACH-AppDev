import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Home, Settings, Search, Upload, User, LogOut } from 'lucide-react';

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

    const handleLogout = () => {
        // Clear session or authentication data (e.g., localStorage)
        localStorage.removeItem('isLoggedIn');
        // Navigate to the SignIn page
        navigate('/signin');
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

                {/* Profile */}
                <div 
                    className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer mb-2" 
                    onClick={handleProfileClick}
                >
                    <img 
                        src="images/Profile.png" 
                        alt="User Profile" 
                        className="w-11 h-11 rounded-full object-cover mr-3"
                    />
                    <div>
                        <div className="font-medium">Pamela Golosinda</div>
                        <div className="text-sm text-gray-300">Profile</div>
                    </div>
                </div>

                {/* Logout Button */}
                <div className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer mt-4" 
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
                         <span className="text-blue-600">Document Layout</span>
                     </div>
                 </div>

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Document Layout</h1>
                    <div className="flex items-center">

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
                            <div className={`w-full h-60 bg-gradient-to-br ${doc.gradient} rounded-lg mb-4`} />
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
        </div>
    );
};

export default DocumentLayout;