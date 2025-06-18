// BottomLeftbar.tsx
import './CrewViewList.css';
import { useState, useEffect } from 'react';
import { dummyDataByIcon } from '../../../crewdata/CrewData';

interface BottomLeftbarProps {
    onSubItemClick: (item: string) => void;
    activeIcon: string;
}

function BottomLeftbar({ onSubItemClick, activeIcon }: BottomLeftbarProps) {
    const [isViewOpen, setIsViewOpen] = useState(true);
    const [openSection, setOpenSection] = useState<string | null>(null);
    const [activeSubItem, setActiveSubItem] = useState<string | null>(null);

    // Get data for the current icon
    const sidebarData = dummyDataByIcon[activeIcon] || {};
    const sections = sidebarData.sections || [];
    const sectionContent = sidebarData.sectionContent || {};

    useEffect(() => {
        // Reset when icon changes
        setIsViewOpen(true);
        setOpenSection(null);
        setActiveSubItem(null);

        if (sections.length > 0) {
            const defaultSection = sections[0];
            const defaultItem = sectionContent[defaultSection]?.[0];
            setOpenSection(defaultSection);
            if (defaultItem) {
                setActiveSubItem(defaultItem);
                onSubItemClick(defaultItem);
            }
        }
    }, [activeIcon]);

    const toggleView = () => {
        setIsViewOpen(!isViewOpen);
    };

    const toggleSection = (section: string) => {
        setOpenSection(prev => (prev === section ? null : section));
        const firstSubItem = sectionContent[section]?.[0];
        if (firstSubItem) {
            setActiveSubItem(firstSubItem);
            onSubItemClick(firstSubItem);
        }
    };

    const handleSubItemClick = (item: string) => {
        setActiveSubItem(item);
        onSubItemClick(item);
    };

    if (sections.length === 0) {
        return null; // Don't render if no data
    }

    return (
        <div className="bottom-leftbar">
            <div className="section-list">
                <div className="view-header" onClick={toggleView}>
                    <span className="section-title">
                        View{activeSubItem ? ` ${activeSubItem}` : ''}
                    </span>
                    <i className={`bi ${isViewOpen ? 'bi-chevron-down' : 'bi-chevron-up'}`}></i>
                </div>

                {isViewOpen && sections.map((section) => (
                    <div key={section}>
                        <div
                            className="section-item"
                            onClick={() => toggleSection(section)}
                        >
                            <span className="section-title">{section}</span>
                            <i
                                className={`bi ${openSection === section ? 'bi-chevron-down' : 'bi-chevron-up'}`}
                            ></i>
                        </div>

                        {openSection === section && sectionContent[section]?.map((item) => (
                            <div
                                key={item}
                                className={`sub-item ${activeSubItem === item ? 'active' : ''}`}
                                onClick={() => handleSubItemClick(item)}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BottomLeftbar;