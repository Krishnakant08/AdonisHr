
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '../pages/Login/Login';
//import ProtectedRoute from './ProtectedRoute';
import Crewlist from '../pages/Crewlist/CrewList';

import Dashboard from '../pages/Dashboard/Dashboard';
import Checkout from '../pages/Checkout/Checkout';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
   
    {
        path: '/dashboard/Modules/Crewlist',
        element: (
            
                <Crewlist />    
        )
    },
    {
        path: '/dashboard/*',
        element: (

            <Dashboard />
        )
    },

    {
        path: '/checkout',
        element: (

            <Checkout />
        )
    },
]);

function Route() {
    return <RouterProvider router={router} />;
}

export default Route;
