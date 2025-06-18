// src/common/CrewForm/CrewAddForm.tsx
import { useState, useEffect } from 'react';
import './CrewAddForm.css';
import { useTranslation } from 'react-i18next';

interface CrewFormProps {
    fields: string[];
    selectedView: string;
    onCancel: () => void;
    onSave: (data: string[]) => void;
    initialData?: string[];
    isEdit?: boolean;
}

export default function CrewForm({
    fields,
    onCancel,
    onSave,
    initialData,
    isEdit = false
}: CrewFormProps) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<string[]>([]);

    useEffect(() => {
        if (initialData) {
            setFormData([...initialData]);
        } else {
            setFormData(Array(fields.length).fill(''));
        }
    }, [initialData, fields.length]);

    const handleChange = (index: number, value: string) => {
        const updated = [...formData];
        updated[index] = value;
        setFormData(updated);
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <div className="crew-form-overlay">
            <div className="crew-form">
                <div className="form-header gray-bar">
                    <h3>{isEdit ? t('crewForm.editUserTitle') : t('crewForm.addUserTitle')}</h3>
                    <button className="close-btn" onClick={onCancel}>×</button>
                </div>

                <div className="form-body">
                    {fields.map((field, index) => (
                        <div key={index} className="form-group">
                            <label>
                                {field.toUpperCase()} <span className="required">{t('crewForm.requiredSymbol')}</span>
                            </label>
                            <input
                                type={field.toLowerCase().includes('password') ? 'password' : 'text'}
                                placeholder={`${t('crewForm.placeholderPrefix')} ${field.toLowerCase()}`}
                                value={formData[index] || ''}
                                onChange={(e) => handleChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                </div>

                <div className="form-footer">
                    <button className="cancel-btn" onClick={onCancel}>{t('crewForm.cancelButton')}</button>
                    <button className="save-btn" onClick={handleSubmit}>{t('crewForm.saveButton')}</button>
                </div>
            </div>
        </div>
    );
}
