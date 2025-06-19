import './LoginForm.css';
import logo from '../../../src/Images/logo.png';
import { useTranslation } from 'react-i18next';
import credentials from '../../../src/Credential/credential.json';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';

function LoginForm() {
    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const setEmailGlobal = useUserStore((state) => state.setEmail);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let valid = true;
        const newErrors = { email: '', password: '' };

        if (!email.trim()) {
            newErrors.email = t('login.emailRequired');
            valid = false;
        }
        if (!password.trim()) {
            newErrors.password = t('login.passwordRequired');
            valid = false;
        }

        if (valid) {
            const user = credentials.find(
                (user) => user.Email === email && user.Password === password
            );

            if (user) {
                setEmailGlobal(email);
                navigate('/dashboard/Modules');
            } else {
                const emailExists = credentials.some((user) => user.Email === email);
                if (!emailExists) newErrors.email = t('login.emailIncorrect');
                else newErrors.password = t('login.passwordIncorrect');
                valid = false;
            }
        }

        setErrors(newErrors);
    };

    const handleFocus = (field: 'email' | 'password') => {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
    };

    return (
        <div className="left-form">
            <div className="logo">
                <img src={logo} alt="Company Logo" />
            </div>
            <h3 className="welcome-heading">{t('login.welcome')}</h3>
            <p className="form-text">{t('login.secureMessage')}</p>

            <form id="login-form" onSubmit={handleSubmit}>
                <div className="form-group has-search-right">
                    <label>{t('login.usernameLabel')}</label> 
                    <a href="#" className="form-control-feedback">
                        <span className="bi bi-person user"></span>
                    </a>
                    <input
                        id="inputEmail"
                        type="email"
                        name="Email"
                        placeholder={t('login.usernamePlaceholder')}
                        className="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => handleFocus('email')}
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                <div className="form-group has-search-right password">
                    <label>{t('login.passwordLabel')}</label>
                    <a href="#" className="form-control-feedback">
                        <span className="bi bi-lock user"></span>
                    </a>
                    <input
                        id="inputPassword"
                        name="Password"
                        type="password"
                        placeholder={t('login.passwordPlaceholder')}
                        className="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => handleFocus('password')}
                    />
                    {errors.password && <p className="error-text">{errors.password}</p>}
                </div>

                <div className="forgot">{t('login.forgotPassword')}</div>

                <div className="mfa-container">
                    <label style={{ color: '#1080F5', marginBottom: '8px', display: 'block' }}>
                        {t('login.mfaLabel')}
                    </label>
                    <div className="mfa-box">
                        <div className="mfa-content">
                            <span className="mfa-placeholder">{t('login.mfaPlaceholder')}</span>
                            <button className="request-code-btn">{t('login.requestCode')}</button>
                        </div>
                    </div>
                </div>

                <div className="submit-form">
                    <button id="submit" type="submit">
                        {t('login.loginButton')}
                    </button>
                </div>
                <div className="mfa">
                    <span>
                        {t('login.changeMfaText')}{' '}
                        <a href="#">{t('login.changeMfaLink')}</a>
                    </span>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
