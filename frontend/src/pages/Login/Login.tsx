import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import axios from 'axios';
import styles from './Login.module.css';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
                username,
                password
            });
            localStorage.setItem('token', response.data.token);
            alert('Login successful');
            navigate('/');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Login</h1>
            <input type="text" placeholder="Username" className={styles.inputField} value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" className={styles.inputField} value={password} onChange={e => setPassword(e.target.value)} />
            <button className={styles.button} onClick={handleLogin}>Login</button>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    )
}

export default Login;