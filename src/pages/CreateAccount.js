import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('https://localhost:7085/api/UserAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            // First log the raw response
            const responseText = await response.text();
            console.log('Raw response:', responseText);
    
            if (response.ok) {
                try {
                    const data = JSON.parse(responseText);
                    alert(data.message || 'Account created successfully!');
                    navigate('/dashboard');
                } catch (parseError) {
                    console.error('Error parsing success response:', parseError);
                    alert('Account may have been created but got an unexpected response');
                }
            } else {
                console.error('Error status:', response.status);
                console.error('Error response text:', responseText);
                alert(`Server error: ${responseText.slice(0, 100)}...`);
            }
        } catch (error) {
            console.error('Error during account creation:', error);
            alert(`Connection error: ${error.message}`);
        }
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
                        Sign Up For Free
                    </h2>
                    <p className="text-sm text-gray-700">
                        Empower yourself as a teacher
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name Input */}
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">
                            Full Name
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="w-full pl-4 pr-4 py-2.5 bg-white rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full pl-4 pr-4 py-2.5 bg-white rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full pl-4 pr-4 py-2.5 bg-white rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Sign Up Button */}
                    <button
                        type="submit"
                        className="w-full flex justify-center items-center px-4 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Sign Up
                    </button>

                    {/* Sign In Link */}
                    <div className="text-center text-sm pt-2">
                        <span className="text-gray-700">Already have an account? </span>
                        <button
                            type="button"
                            onClick={() => navigate('/signin')}
                            className="text-blue-600 hover:text-blue-700"
                        >
                            Sign In
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreateAccount;
