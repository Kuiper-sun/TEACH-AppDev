import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Home, Bell, Settings, LogOut} from 'lucide-react';

const Activities = () => {
    const navigate = useNavigate();

    const activities = [
        { id: 1, title: "Grade 2 English - Pronouns Activity 1.pdf", path: "/Grade2_English_Pronoun.pdf"},
        { id: 2, title: "Grade 4 Math - Place Value Activity 1", path: "/Grade4_Math_PlaceValue.pdf"},
        { id: 3, title: "Grade 4 Math - Visualizing Numbers Activity.pdf", path: "/Grade4_Math_VisualizingNumbers.pdf"},
        { id: 4, title: "Grade 5 English - Adverb of frequency Activity.pdf", path: "/Grade5_English_AdverbofFrequency.pdf"}
    ];

    const handleLogout = () => {
        // Clear session or authentication data (e.g., localStorage)
        localStorage.removeItem('isLoggedIn');
        // Navigate to the SignIn page
        navigate('/signin');
    };

    return (
        <div className="flex h-screen bg-gradient-to-b from-blue-500 to-blue-400">
            {/* Sidebar */}
            <div className="w-64 p-6 flex flex-col h-screen sticky top-0 justify-between">
                <div>
                    <div className="flex items-center mb-8">
                        <img  src="/images/LogoName.png" alt="TEACH Logo" className="h-12 w-auto" />
                    </div>
                    <nav className="space-y-2">
                        <div className="flex items-center text-white p-3 rounded hover:bg-blue-500/30 cursor-pointer" 
                             onClick={() => navigate('/dashboard')}>
                            <Home className="h-5 w-5 mr-3" />
                            <span>Home</span>
                        </div>
                        <div className="flex items-center text-white p-3 rounded hover:bg-blue-500/30 cursor-pointer" 
                             onClick={() => navigate('/notifications')}>
                            <Bell className="h-5 w-5 mr-3" />
                            <span>Notifications</span>
                        </div>
                        <div className="flex items-center text-white p-3 rounded hover:bg-blue-500/30 cursor-pointer" 
                             onClick={() => navigate('/settings')}>
                            <Settings className="h-5 w-5 mr-3" />
                            <span>Settings</span>
                        </div>
                    </nav>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer" 
                         onClick={() => navigate('/profile')}>
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
                    <div className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer" 
                         onClick={handleLogout}>
                        <LogOut className="h-5 w-5 mr-3" />
                        <span>Log Out</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-50 p-8 overflow-auto">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <div className="text-lg text-gray-600 flex items-center">
                        <Home className="h-5 w-5 mr-2 text-gray-600" />
                        <span className="cursor-pointer" onClick={() => navigate('/dashboard')}>Home</span>
                        <span className="mx-2 text-gray-600"> &gt; </span> {/* This is the '>' separator */}
                        <span className="cursor-pointer" onClick={() => navigate('/resources')}>Resources</span>
                        <span className="mx-2 text-gray-600"> &gt; </span> {/* Another '>' separator */}
                        <span className="text-blue-600">Activities</span>
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-8">Activities</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {activities.map(activity => (
                        <div 
                            key={activity.id} 
                            className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg transition-shadow cursor-pointer"
                        >
                            <div className="flex justify-center items-center w-full h-32 bg-gray-50 rounded-lg mb-4">
                                <svg className="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V5..." />
                                </svg>
                            </div>
                            {/* Activity Title with Link */}
                            <a 
                                href={activity.path} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-lg font-semibold text-blue-600"
                            >
                                {activity.title}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Activities;
