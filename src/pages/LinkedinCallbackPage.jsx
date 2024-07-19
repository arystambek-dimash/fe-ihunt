import React, {useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import api from "../services/api";

const LinkedInCallbackPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        console.log(queryParams.keys())
        const code = queryParams.get('code');

        if (code) {
            api.get(`/networks/linkedin/callback?code=${code}`)
                .then(response => {
                    console.log('Response:', response);
                    alert('Successfully logged in with LinkedIn');
                    navigate('/auto-response/profile');
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Invalid code or failed login');
                    navigate('/auto-response/profile');
                });
        } else {
            console.error('No code found in URL');
            navigate('/auto-response/profile');
        }
    }, [location, navigate]);

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <p>Logging in...</p>
        </div>
    );
};

export default LinkedInCallbackPage;
