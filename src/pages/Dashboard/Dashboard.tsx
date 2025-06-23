import { useLocation } from 'react-router-dom';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import Rightbar from '../../components/Module/Rightbar/ModuleRightbar';
import GroupsRightbar from '../../components/Datagroups/Rightbar/GroupsRightbar';
import ReportsRightbar from '../../components/Reports/Rightbar/ReportsRightbar';
import ViewRightbar from '../../components/View/Rightbar/ViewRightbar';
function Dashboard() {
    const location = useLocation();
    const path = location.pathname.toLowerCase();

    let rightPanel = null;

    if (path.includes('/dashboard/modules')) {
        rightPanel = <Rightbar />;
    } else if (path.includes('/dashboard/datagroups')) {
        rightPanel = <GroupsRightbar />;
    } else if (path.includes('/dashboard/reports')) {
        rightPanel = <ReportsRightbar />;
    } else if (path.includes('/dashboard/view')) {
        rightPanel = <ViewRightbar />;
    }

    return <DashboardLayout rightPanel={rightPanel} />;
}

export default Dashboard;
