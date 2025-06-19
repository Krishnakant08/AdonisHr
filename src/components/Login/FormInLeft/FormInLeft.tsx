import LoginForm from '../../../common/LoginForm/LoginForm';
// import ImageInRight from '../ImageInRight/ImageInRight';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import LeftLoginPhoto from '../../../Images/LeftLoginPhoto.png';
import './FormInLeft.css';
import { useTranslation } from 'react-i18next';

function FormInLeft() {
    const { t } = useTranslation();

    return (
        <div className="form-left-container">
            <div className="form-content-wrapper">
                <LanguageSwitcher />
                <LoginForm />
            </div>
            <div className="form-content-wrapper">
                <div className="image-right-container">
                    <img
                        src={LeftLoginPhoto}
                        alt=""
                        className="right-image"
                    />
                    <div className="image-overlay">
                        <div className="content-over-image">
                            <span className="highlighted-text">
                                <i className="bi bi-hand-thumbs-up"></i>
                                {t('login.highlightedText')}
                            </span>
                            <p>{t('login.description')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormInLeft;
