// CrewList.tsx
import CrewListComponent from '../../components/Crewlist/CrewList/CrewList';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

function CrewList(props: { activeIcon?: string }) {
    const { activeIcon = 'bi-airplane' } = props;

    return (
        <DashboardLayout
            rightPanel={<CrewListComponent activeIcon={activeIcon} />}
        />
    );
}

export default CrewList;
