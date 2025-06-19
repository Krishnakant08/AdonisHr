// DashboardLayout.tsx
import { useLocation } from 'react-router-dom';
import './Dashboard.css';
import Navbar from '../../common/Navbar/Navbar';
import LeftSidebar from '../../common/LeftSidebar/LeftSidebar';
import { useState } from 'react';
import React from 'react';


interface DashboardLayoutProps {
    rightPanel?: React.ReactNode;
}
const getInitialIcon = (path: string): string => {
    if (path.includes('/dashboard/modules/crewlist')) return 'bi-airplane';
    // Add other route-icon mappings as needed
    return '';
};

function DashboardLayout({ rightPanel }: DashboardLayoutProps) {
    const location = useLocation();
    const [activeIcon, setActiveIcon] = useState<string>(getInitialIcon(location.pathname));
    const [activeLabel, setActiveLabel] = useState<string | undefined>('CrewList');


    const path = location.pathname.toLowerCase();

    const getActiveTab = (): 'Modules' | 'Datagroups' | 'Reports' | 'View' => {
        if (path.includes('/dashboard/modules')) return 'Modules';
        if (path.includes('/dashboard/datagroups')) return 'Datagroups';
        if (path.includes('/dashboard/reports')) return 'Reports';
        if (path.includes('/dashboard/view')) return 'View';
        return 'Modules';
    };

    const activeTab = getActiveTab();

    return (
        <div className="Dashboard">
            <div className="TopNavbar"><Navbar /></div>
            <div className="MainContent">
                <div className="Left">
                    <LeftSidebar
                        activeTab={activeTab}
                        activeIcon={activeIcon}
                        onIconClick={setActiveIcon}
                        onLabelChange={setActiveLabel} // Pass the setter
                    />
                </div>
                <div className="Right">
                    {rightPanel &&
                        React.cloneElement(rightPanel as React.ReactElement<any>, {
                            activeIcon,
                            activeLabel, // Pass the activeLabel
                            onIconChange: setActiveIcon
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;
