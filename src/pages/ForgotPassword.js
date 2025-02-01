import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for sending password reset request
        alert(`Password reset link sent to: ${email}`);
        navigate('/signin');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-600 via-blue-500 to-blue-200 p-6">
            <div className="w-full max-w-md space-y-6">
                {/* Logo */}
                <div className="flex justify-center items-center mb-2">
                    <img  src="/images/LogoName.png" alt="TEACH Logo" className="h-24 w-auto" />
                </div>

                {/* Title */}
                <div className="text-center space-y-1">
                    <h2 className="text-xl font-bold text-gray-900">
                        Reset Your Password
                    </h2>
                    <p className="text-sm text-gray-700 max-w-sm mx-auto">
                        Forgot your password? No worries, then let's submit password reset. It will be send to your email.
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="elementary.teach@gmail.com"
                            />
                        </div>
                    </div>

                    {/* Reset Password Button */}
                    <button
                        type="submit"
                        className="w-full flex justify-center items-center px-4 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <Lock className="h-4 w-4 mr-2" />
                        Reset Password
                    </button>

                    {/* Back to Login */}
                    <button
                        type="button"
                        onClick={() => navigate('/signin')}
                        className="w-full flex justify-center items-center px-4 py-2 text-blue-600 hover:text-blue-700"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to login screen
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;