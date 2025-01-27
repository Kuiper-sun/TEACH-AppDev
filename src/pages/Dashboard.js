import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Home, Settings, Search, LogOut } from 'lucide-react'; // Import LogOut icon

const Dashboard = () => {
    const navigate = useNavigate();

    const handleFeatureClick = (route) => {
        navigate(route);
    };

    const handleHomeClick = () => {
        navigate('/dashboard');
    };

    const handleNotificationClick = () => {
        navigate('/notifications');
    };

    const handleSettingsClick = () => {
        navigate('/settings');
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleLogout = () => {
        // Clear session or authentication data (e.g., localStorage)
        localStorage.removeItem('isLoggedIn');
        // Navigate to the SignIn page
        navigate('/signin');
    };

    const features = [
        {
            title: "Document Layout",
            route: "/document-layout",
            description: "Easily fill in pre-designed documents with fixed layouts. Simply enter the required information and export as a PDF—no editing or formatting needed."
        },
        {
            title: "Resources",
            route: "/resources",
            description: "Access, upload, and organize various resources to enhance lesson plans, such as videos, learning materials, and links to websites and articles."
        },
        {
            title: "Student Progress",
            route: "/student-progress",
            description: "Track student progress, input test scores, and categorize students into performance levels. Display progress through charts and generate PDF reports."
        },
        {
            title: "Task Scheduler",
            route: "/task-scheduler",
            description: "Efficiently schedule administrative tasks for teachers by considering available time slots, task duration, and priority levels, with notification reminders."
        }
    ];

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
                        <div className="flex items-center text-white p-3 rounded-lg hover:bg-white/10 cursor-pointer" onClick={handleHomeClick}>
                            <Home className="h-5 w-5 mr-3" />
                            <span>Home</span>
                        </div>
                        <div className="flex items-center text-white p-3 rounded-lg hover:bg-white/10 cursor-pointer" onClick={handleNotificationClick}>
                            <Bell className="h-5 w-5 mr-3" />
                            <span>Notifications</span>
                        </div>
                        <div className="flex items-center text-white p-3 rounded-lg hover:bg-white/10 cursor-pointer" onClick={handleSettingsClick}>
                            <Settings className="h-5 w-5 mr-3" />
                            <span>Settings</span>
                        </div>
                    </div>
                </nav>

                {/* Profile */}
                <div className="flex items-center mt-auto cursor-pointer" onClick={handleProfileClick}>
                    <img 
                        src="/path/to/profile-pic.png" 
                        alt="Profile"
                        className="w-10 h-10 rounded-full bg-gray-300"
                    />
                    <div className="ml-3 text-white">
                        <div className="font-medium">Pamela Golosinda</div>
                        <div className="text-sm text-gray-300">Profile</div>
                    </div>
                </div>

                {/* Logout Button */}
                <div className="flex items-center text-white p-3 rounded-lg hover:bg-white/10 cursor-pointer mt-8" onClick={handleLogout}>
                    <LogOut className="h-5 w-5 mr-3" />
                    <span>Logout</span>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 rounded-tl-[2.5rem] p-8">
                {/* Breadcrumb */}
                <div className="flex items-center mb-6 text-gray-600">
                    <Home className="h-4 w-4 mr-2" />
                    <span>Home</span>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold mb-8">Home</h1>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="bg-white p-6 rounded-xl cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => handleFeatureClick(feature.route)}
                        >
                            <div className="w-full h-48 bg-gradient-to-br from-teal-400 via-blue-500 to-blue-600 rounded-lg mb-4"></div>
                            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>
            </main>

            {/* Right Icons */}
            <div className="absolute top-8 right-8 flex items-center space-x-4">
                <Bell className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleNotificationClick} />
                <Settings className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleSettingsClick} />
                <img 
                    src="/path/to/profile-pic.png" 
                    alt="Profile"
                    className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer"
                    onClick={handleProfileClick}
                />
            </div>
        </div>
    );
};

export default Dashboard;
