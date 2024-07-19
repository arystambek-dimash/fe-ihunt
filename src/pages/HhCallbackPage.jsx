import React, {useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import api from "../services/api";

const HhCallbackPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');

        if (code) {
            api.get(`/networks/headhunter?code=${code}`)
                .then(response => {
                    alert('Successfully logged in Head Hunter');
                    navigate('/auto-response/profile');
                })
                .catch(error => {
                    console.error(error);
                    alert('Invalid code');
                    navigate('/auto-response/profile');
                });
        }
    }, [location, navigate]);

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <p>Logging in...</p>
        </div>
    );
};

export default HhCallbackPage;
