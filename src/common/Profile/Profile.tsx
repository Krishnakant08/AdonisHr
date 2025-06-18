// Profile.tsx
import { useState, useEffect, useRef } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';

function Profile() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const email = useUserStore((state) => state.email);
    const logout = useUserStore((state) => state.logout);
    const initial = email ? email.charAt(0).toUpperCase() : '?';

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleSignOut = () => {
        logout();
        navigate('/');
    };

    const handleCheckout = () => {
        setIsOpen(false);
        navigate('/checkout'); // Navigate to checkout page
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="profile" ref={dropdownRef}>
            <button className="avatar-button" onClick={toggleDropdown}>
                <span className="avatar-initial">{initial}</span>
                <i className="bi bi-chevron-down"></i>
            </button>

            {isOpen && (
                <div className="dropdown-wrapper">
                    <div className="dropdown-arrow" />
                    <div className="dropdown-menu">
                        <div className="dropdown-header">
                            <span className="avatar-initial small">{initial}</span>
                            <span className="user-email">{email}</span>
                        </div>

                        {/* ✅ New Checkout Option */}
                        <div className="dropdown-option" onClick={handleCheckout}>
                            Checkout
                            <i className="bi bi-cart-check"></i>
                        </div>

                        {/* Sign Out Option */}
                        <div className="bi bi-box-arrow-right signouticon dropdown-option signout" onClick={handleSignOut}>
                            Sign Out
                            <i className="bi bi-chevron-right"></i>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
