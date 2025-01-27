import React from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();

    const goToSignUp = () => {
        navigate('/create-account'); // Redirect to the sign-up page
    };

    const goToSignIn = () => {
        navigate('/signin'); // Redirect to the sign-in page
    };

    return (
        <div className="home-container">
            <button className="create-account-button" onClick={goToSignUp}>
                Create Account
            </button>
            <p>Already have an account?</p>
            <button className="signin-button" onClick={goToSignIn}>
                Sign In
            </button>
        </div>
    );
};

export default Home;
