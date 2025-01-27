import React, { useState } from 'react';
import { Bell, Settings, Home, Search, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
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
                <div className="flex items-center mt-auto cursor-pointer bg-white/10 p-3 rounded-lg">
                    <img 
                        src="/api/placeholder/40/40"
                        alt="Profile"
                        className="w-10 h-10 rounded-full bg-gray-300"
                    />
                    <div className="ml-3 text-white">
                        <div className="font-medium">Pamela Golosinda</div>
                        <div className="text-sm text-gray-300">Profile</div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 rounded-tl-[2.5rem] p-8 relative">
                {/* Breadcrumb */}
                <div className="flex items-center mb-6 text-gray-600">
                    <Home className="h-4 w-4 mr-2" />
                    <span className="mr-2">Home</span>
                    <span className="mx-2">/</span>
                    <span>Profile</span>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold mb-8">Profile</h1>

                {/* Profile Content */}
                <div className="max-w-3xl">
                    <div className="bg-white rounded-xl p-6">
                        <div className="flex items-center gap-6 mb-8">
                            <img 
                                src="/api/placeholder/80/80"
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

                {/* Right Icons */}
                <div className="absolute top-8 right-8 flex items-center space-x-4">
                    <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
                    <Settings className="h-6 w-6 text-gray-600 cursor-pointer" />
                    <img 
                        src="/api/placeholder/40/40"
                        alt="Profile"
                        className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer"
                    />
                </div>
            </main>
        </div>
    );
};

export default Profile;