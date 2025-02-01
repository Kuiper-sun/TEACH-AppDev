import React, { useState } from 'react';
import { Bell, Settings, Home, Search, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const handleNotificationsClick = () => {
        navigate("/notifications");
      };
    
      const handleSettingsClick = () => {
        navigate("/settings");
      };
    const handleHomeClick = () => {
        navigate("/dashboard");
      };
    const [profile, setProfile] = useState({
        name: 'Pamela Golosinda',
        email: 'elementaryteach@gmail.com',
        role: 'Elementary Teacher',
        bio: 'Educator passionate about helping students succeed in their academic journey.',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogout = () => {
        // Clear session or authentication data (e.g., localStorage)
        localStorage.removeItem('isLoggedIn');
        // Navigate to the SignIn page
        navigate('/signin');
    };

    const handleProfileClick = () => {
        navigate("/profile");
      };

    return (
        <div className="flex h-screen bg-gradient-to-b from-blue-500 to-blue-400">
            {/* Sidebar */}
            <div className="w-64 p-6 flex flex-col h-screen sticky top-0">
                {/* Logo */}
                <div className="flex items-center mb-8">
                    <img  src="/images/LogoName.png" alt="TEACH Logo" className="h-12 w-auto" />
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
                            className="flex items-center text-white p-3 rounded-lg hover:bg-white/10 cursor-pointer"
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
                <div 
                    className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer" 
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
                    <div className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer" 
                         onClick={handleLogout}>
                        <LogOut className="h-5 w-5 mr-3" />
                        <span>Log Out</span>
                    </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 p-8 overflow-auto">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <div className="text-lg text-gray-600 flex items-center">
                        <Home className="h-5 w-5 mr-2 text-gray-600" />
                        <span className="cursor-pointer" onClick={() => navigate('/dashboard')}>Home</span>
                        <span className="mx-2 text-gray-600"> &gt; </span> {/* This is the '>' separator */}
                        <span className="text-blue-600">Profile</span>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold mb-8">Profile</h1>

                {/* Profile Content */}
                <div className="max-w-3xl">
                    <div className="bg-white rounded-xl p-6">
                        <div className="flex items-center gap-6 mb-8">
                            <img 
                                src="/images/profile.png"
                                alt="Profile"
                                className="w-20 h-20 rounded-full"
                            />
                            <div>
                                <h2 className="text-xl font-semibold">{profile.name}</h2>
                                <p className="text-gray-500">{profile.role}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Full Name</label>
                                <input 
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input 
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Role</label>
                                <input 
                                    type="text"
                                    name="role"
                                    value={profile.role}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium mb-2">Bio</label>
                                <textarea
                                    name="bio"
                                    value={profile.bio}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                                Cancel
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;