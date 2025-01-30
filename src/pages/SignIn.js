import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const SignIn = () => {
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rememberMe) {
            localStorage.setItem('isLoggedIn', 'true');
        }
        navigate('/dashboard');
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-600 via-blue-500 to-blue-200 p-6">
            <div className="w-full max-w-md space-y-6">
                {/* Logo */}
                <div className="flex justify-center items-center mb-2">
                    <div className="text-3xl font-bold text-gray-900">TEACH</div>
                </div>

                {/* Title */}
                <div className="text-center space-y-1">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Sign In To Your Account
                    </h2>
                    <p className="text-sm text-gray-700">
                        Empower yourself as a teacher
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="email"
                                required
                                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="elementary.teach@gmail.com"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                className="w-full pl-10 pr-10 py-2.5 bg-white rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="••••••••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            >
                                {showPassword ? 
                                    <EyeOff className="h-5 w-5" /> : 
                                    <Eye className="h-5 w-5" />
                                }
                            </button>
                        </div>
                    </div>

                    {/* Remember Me and Forgot Password */}
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                                className="h-4 w-4 text-blue-600 rounded border-gray-300"
                            />
                            <label className="ml-2 text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <button
                            type="button"
                            onClick={() => navigate('/forgot-password')}
                            className="text-sm text-blue-600 hover:text-blue-700"
                        >
                            Forgot Password
                        </button>
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        className="w-full flex justify-center items-center px-4 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Sign In
                    </button>

                    {/* Sign Up Link */}
                    <div className="text-center text-sm pt-2">
                        <span className="text-gray-700">Don't have an account? </span>
                        <button
                            type="button"
                            onClick={() => navigate('/create-account')}
                            className="text-blue-600 hover:text-blue-700"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;