import { useState, useRef, useEffect } from 'react';
import './LanguageSwitcher.css';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setOpen(prev => !prev);

    const languageMap: { [key: string]: string } = {
        English: 'en',
        Anglais: 'en',
        Francais: 'fr',
        French: 'fr' 
    };

    const handleLanguageChange = (lang: string) => {
        const languageCode = languageMap[lang];
        if (languageCode) {
            console.log("Switching to:", languageCode); // ✅ Add this
            i18n.changeLanguage(languageCode);
        }
        setOpen(false);
    };



    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="language-switcher">
            <div id="mini-nav" ref={dropdownRef}>
                <div className="dropdown pull-right">
                    <button
                        id="switch-btn"
                        type="button"
                        onClick={toggleDropdown}
                        aria-haspopup="true"
                        aria-expanded={open}
                    >
                        <span className="switch-left">
                            <i className="bi bi-translate dark-icon"></i>
                            <span className="lang-label">{t('login.label')}</span>
                        </span>
                        <i className={`bi bi-chevron-${open ? 'up' : 'down'} right-icon`}></i>
                    </button>
                    {open && (
                        <ul id="lang-switcher-list" className="dropdown-menu">
                            {(t('login.options', { returnObjects: true }) as string[]).map((lang, index) => (
                                <li key={index}>
                                    <a href="#" onClick={() => handleLanguageChange(lang)}>{lang}</a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LanguageSwitcher;
