import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import logoUrl from '../assets/logo.png';
import { User, Lock, LogIn } from 'lucide-react';
import '../index.css';

export const LoginPage: React.FC = () => {
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const login = useAuthStore(state => state.login);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(studentId, password);
        if (success) {
            navigate('/');
        } else {
            setError('الرجاء إدخال الرقم الجامعي وكلمة المرور');
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <img src={logoUrl} alt="University Logo" className="login-logo" />
                <h2 className="login-title">تسجيل الدخول</h2>
                <p className="login-subtitle">BUS TRACKER INU</p>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <User size={20} className="input-icon" />
                        <input
                            type="text"
                            placeholder="الرقم الجامعي"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            className="login-input"
                        />
                    </div>

                    <div className="input-group">
                        <Lock size={20} className="input-icon" />
                        <input
                            type="password"
                            placeholder="كلمة المرور"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="login-btn">
                        <span>دخول</span>
                        <LogIn size={20} />
                    </button>
                </form>

                <p className="developer-credit-login">من تطوير الطالب : قيس طلال الجازي</p>
            </div>
        </div>
    );
};
