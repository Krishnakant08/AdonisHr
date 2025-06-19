// AlertMessage.tsx
import { useEffect } from 'react';
import './AlertMessage.css';

interface AlertMessageProps {
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    duration?: number;
    onClose?: () => void;
    showConfirm?: boolean;
    onConfirm?: () => void;
}

function AlertMessage({
    message,
    type = 'info',
    duration = 3000,
    onClose,
    showConfirm = false,
    onConfirm
}: AlertMessageProps) {
    useEffect(() => {
        if (duration > 0 && !showConfirm) {
            const timer = setTimeout(() => {
                onClose?.();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose, showConfirm]);

    return (
        <div className={`alert-message ${type}`}>
            <div className="alert-header">
                <div className="alert-icon-container">
                    <div className="alert-icon-background">
                        {type === 'info' && <i className="bi bi-info-circle-fill"></i>}
                        {type === 'success' && <i className="bi bi-check-circle-fill"></i>}
                        {type === 'warning' && <i className="bi bi-exclamation-triangle-fill"></i>}
                        {type === 'error' && <i className="bi bi-x-circle-fill"></i>}
                    </div>
                </div>
                <button className="alert-close" onClick={onClose} aria-label="Close alert">
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>

            <div className="alert-body">
                <p className="alert-text">{message}</p>
            </div>

            {showConfirm ? (
                <div className="alert-footer confirm-actions">
                    <button
                        className="alert-button secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="alert-button primary"
                        onClick={() => {
                            onConfirm?.();
                            onClose?.();
                        }}
                        autoFocus
                    >
                        Confirm
                    </button>
                </div>
            ) : (
                <div className="alert-footer">
                    <button
                        className="alert-button primary"
                        onClick={onClose}
                        autoFocus
                    >
                        OK
                    </button>
                </div>
            )}
        </div>
    );
}

export default AlertMessage;