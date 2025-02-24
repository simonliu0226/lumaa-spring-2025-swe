import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import axios from 'axios';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleSignUp = async () => {
        try {
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
                username,
                password
            });
            alert('Sign up successful');
            navigate('/login');
        } catch (err) {
            alert('Sign up failed');
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <button onClick={handleSignUp}>Sign Up</button>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    )
}

export default Login;