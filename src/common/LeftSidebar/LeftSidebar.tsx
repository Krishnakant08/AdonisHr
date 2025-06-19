import './LeftSidebar.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 👈 Add this

type TabKey = 'Modules' | 'Datagroups' | 'Reports' | 'View';

interface LeftProps {
    activeTab: TabKey;
    activeIcon: string;
    onIconClick: (icon: string) => void;
    onLabelChange?: (label?: string) => void;
}

function LeftSidebar({ activeTab, activeIcon, onIconClick, onLabelChange = () => { } }: LeftProps) {
    const { t } = useTranslation(); // 👈 Get the `t` function for dynamic translations
    const navigate = useNavigate();

    // 👇 Use translation function `t()` here
    const iconMap: Record<TabKey, { icon: string; route?: string; label?: string }[]> = {
        Modules: [
            { icon: 'bi-airplane', route: '/dashboard/modules/crewlist', label: t('leftSidebar.modules.crewlist') },
            { icon: 'bi-bullseye', route: '/dashboard/modules/crewlist', label: t('leftSidebar.modules.report') },
            { icon: 'bi-clock', route: '/dashboard/modules/crewlist', label: t('leftSidebar.modules.clock') },
            { icon: 'bi-disc', route: '/dashboard/modules/crewlist', label: t('leftSidebar.modules.section') }
        ],
        Datagroups: [
            { icon: 'bi-file-earmark-arrow-down', route: '/dashboard/datagroups', label: t('leftSidebar.datagroups.download') },
            { icon: 'bi-plus-circle', label: t('leftSidebar.datagroups.add') },
            { icon: 'bi-c-circle', label: t('leftSidebar.datagroups.c') },
            { icon: 'bi-dash-circle', label: t('leftSidebar.datagroups.dash') }
        ],
        Reports: [
            { icon: 'bi-stopwatch', route: '/dashboard/reports', label: t('leftSidebar.reports.timer') },
            { icon: 'bi-bell', label: t('leftSidebar.reports.alert') },
            { icon: 'bi-file-earmark', label: t('leftSidebar.reports.file') },
            { icon: 'bi-journal', label: t('leftSidebar.reports.journal') }
        ],
        View: [
            { icon: 'bi-dribbble', label: t('leftSidebar.view.dribbble') },
            { icon: 'bi-people', label: t('leftSidebar.view.people') },
            { icon: 'bi-person', label: t('leftSidebar.view.person') },
            { icon: 'bi-alarm', label: t('leftSidebar.view.alarm') }
        ]
    };

    const handleIconClick = (icon: string, route?: string, label?: string) => {
        onIconClick(icon);
        onLabelChange(label);
        if (route) navigate(route);
    };

    return (
        <div className="Sidebar">
            {iconMap[activeTab].map(({ icon, route, label }, index) => (
                <div
                    key={index}
                    className={`icon-container ${activeIcon === icon ? 'active-icon' : ''}`}
                    onClick={() => handleIconClick(icon, route, label)}
                    title={label}
                    style={{ cursor: route ? 'pointer' : 'default' }}
                >
                    <i className={`bi ${icon} sidebar-icon`} />
                </div>
            ))}
        </div>
    );
}

export default LeftSidebar;
