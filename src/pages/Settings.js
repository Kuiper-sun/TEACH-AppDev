import React, { useState } from 'react';
import { Bell, Settings as SettingsIcon, Home, Search, Eye, EyeOff, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailNotification, setEmailNotification] = useState(true);

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
            <div className="w-64 p-6 flex flex-col">
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
                            className="flex items-center text-white p-3 rounded-lg bg-white/10 cursor-pointer"
                        >
                            <SettingsIcon className="h-5 w-5 mr-3" />
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
            <main className="flex-1 bg-gray-50 p-8 relative">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <div className="text-lg text-gray-600 flex items-center">
                        <Home className="h-5 w-5 mr-2 text-gray-600" />
                        <span className="cursor-pointer" onClick={() => navigate('/dashboard')}>Home</span>
                        <span className="mx-2 text-gray-600"> &gt; </span> {/* This is the '>' separator */}
                        <span className="text-blue-600">Settings</span>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold mb-8">Settings</h1>

                {/* Settings Sections */}
                <div className="space-y-8 max-w-3xl">
                    {/* Personal Info */}
                    <section className="bg-white rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-2">Personal Info</h2>
                        <p className="text-gray-500 text-sm mb-6">You can change your personal information settings here.</p>
                        
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Full Name</label>
                                <input 
                                    type="text" 
                                    value="Pamela Golosinda"
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email Address</label>
                                <input 
                                    type="email" 
                                    value="elementaryteach@gmail.com"
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Phone Number</label>
                                <input 
                                    type="tel" 
                                    value="+63 (917) 123-4567"
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Password</label>
                                <input 
                                    type="password" 
                                    value="••••••••••••••"
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium mb-2">Change Avatar</label>
                            <div className="flex items-center gap-4">
                                <img 
                                    src="/images/Profile.png"
                                    alt="Current avatar"
                                    className="w-12 h-12 rounded-full"
                                />
                                <div className="flex-1">
                                    <div className="text-blue-600 hover:text-blue-700 cursor-pointer text-sm">
                                        Click here to upload your file or drag Supported Format: SVG, JPG, PNG (10mb each)
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Save
                            </button>
                        </div>
                    </section>

                    {/* Change Password */}
                    <section className="bg-white rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-2">Change Password</h2>
                        <p className="text-gray-500 text-sm mb-6">You can change your password here.</p>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Current Password</label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full p-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button 
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">New Password</label>
                                <input 
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                                <input 
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Save Changes
                            </button>
                        </div>
                    </section>

                    {/* Delete Account */}
                    <section className="bg-white rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-2">Delete Account</h2>
                        <p className="text-gray-500 text-sm mb-6">You can manage to delete all your data here and cannot be undone.</p>
                        
                        <button className="text-red-600 hover:text-red-700 font-medium">
                            I want to delete my account
                        </button>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Settings;