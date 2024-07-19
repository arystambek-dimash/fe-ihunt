import React from 'react';
import ReactDOM from 'react-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import {AuthProvider} from './context/AuthContext';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <Router>
                <App/>
            </Router>
        </AuthProvider>
    </QueryClientProvider>,
    document.getElementById('root')
);
