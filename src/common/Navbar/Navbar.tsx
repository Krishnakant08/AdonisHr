// Navbar.tsx
import './Navbar.css';
import logo from '../../../public/Images/image.png';
import { useLocation, useNavigate } from 'react-router-dom';
import Profile from '../Profile/Profile';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Navbar() {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const pathname = location.pathname.toLowerCase();

    const navTabs = [
        { id: 'modules', label: t('Navbar.Module'), icon: 'bi-gear' },
        { id: 'datagroups', label: t('Navbar.Datagroups'), icon: 'bi-shield-check' },
        { id: 'reports', label: t('Navbar.Reports'), icon: 'bi-people' },
        { id: 'view', label: t('Navbar.View'), icon: 'bi-people-fill' }
    ];

    const handleTabClick = (tabId: string) => {
        navigate(`/dashboard/${tabId}`);
        setIsMenuOpen(false);
    };

    const isActiveTab = (tabId: string): boolean => {
        return pathname.includes(`/dashboard/${tabId}`);
    };
    return (
        <div className="navbar-wrapper">
            <header className="header admin-side-header">
                <nav className="navbar navbar-expand-lg fixed-top">
                    <img src={logo} alt="Company Logo" className="navbar-logo" />
                    <div className="container-fluid nav-container">
                        <button
                            className="navbar-toggler"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-expanded={isMenuOpen}
                            aria-label="Toggle navigation"
                        >
                            <i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
                        </button>

                        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="dashnavbarNav">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {navTabs.map((tab) => (
                                    <li
                                        key={tab.id}
                                        className={`nav-item ${isActiveTab(tab.id) ? 'active' : ''}`}
                                        onClick={() => handleTabClick(tab.id)}
                                    >
                                        <span className="nav-link">
                                            <i className={`bi ${tab.icon}`}></i> {tab.label}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {isMenuOpen && (
                            <div className="navbar-overlay" onClick={() => setIsMenuOpen(false)}></div>
                        )}

                        <Profile />
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Navbar;
