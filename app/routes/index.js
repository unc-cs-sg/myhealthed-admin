import React, { useContext, useState, useEffect } from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router';

// ----------- Pages Imports ---------------
import APIDemo from "./API_Demo/Demo"
import LinkDemo from "./Link/LinkDemo"

import Analytics from './Dashboards/Analytics';
import ProjectsDashboard from './Dashboards/Projects';
import System from './Dashboards/System';
import Monitor from './Dashboards/Monitor';
import Financial from './Dashboards/Financial';
import Stock from './Dashboards/Stock';
import Reports from './Dashboards/Reports';

import Widgets from './Widgets';

import Cards from './Cards/Cards';
import CardsHeaders from './Cards/CardsHeaders';

import NavbarOnly from './Layouts/NavbarOnly';
import SidebarDefault from './Layouts/SidebarDefault';
import SidebarA from './Layouts/SidebarA';
import DragAndDropLayout from './Layouts/DragAndDropLayout';
import SidebarWithNavbar from './Layouts/SidebarWithNavbar';

import Accordions from './Interface/Accordions';
import Alerts from './Interface/Alerts';
import Avatars from './Interface/Avatars';
import BadgesLabels from './Interface/BadgesLabels';
import Breadcrumbs from './Interface/Breadcrumbs';
import Buttons from './Interface/Buttons';
import Colors from './Interface/Colors';
import Dropdowns from './Interface/Dropdowns';
import Images from './Interface/Images';
import ListGroups from './Interface/ListGroups';
import MediaObjects from './Interface/MediaObjects';
import Modals from './Interface/Modals';
import Navbars from './Interface/Navbars';
import Paginations from './Interface/Paginations';
import ProgressBars from './Interface/ProgressBars';
import TabsPills from './Interface/TabsPills';
import TooltipPopovers from './Interface/TooltipsPopovers';
import Typography from './Interface/Typography';
import Notifications from './Interface/Notifications';
import CropImage from './Interface/CropImage';
import DragAndDropElements from './Interface/DragAndDropElements';
import Calendar from './Interface/Calendar';
import ReCharts from './Graphs/ReCharts';

import Tables from './Tables/Tables';
import ExtendedTable from './Tables/ExtendedTable';
import AgGrid from './Tables/AgGrid';

import UserApproval from './Pages/UserApproval';
import ComingSoon from './Pages/ComingSoon';
import Confirmation from './Pages/Confirmation';
import Danger from './Pages/Danger';
import Error404 from './Pages/Error404';
import ForgotPassword from './Pages/ForgotPassword';
import LockScreen from './Pages/LockScreen';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Success from './Pages/Success';
import Timeline from './Pages/Timeline';

import Icons from './Icons';
import { UserContext } from '../providers/UserProvider';
import { db } from '../firebase/firebase';

// ----------- Layout Imports ---------------
import { DefaultNavbar } from './../layout/components/DefaultNavbar';
import { DefaultSidebar } from './../layout/components/DefaultSidebar';

import { SidebarANavbar } from './../layout/components/SidebarANavbar';
import { SidebarASidebar } from './../layout/components/SidebarASidebar';
import { PageLoader } from './../components/index'

//------ Route Definitions --------
// eslint-disable-next-line no-unused-vars
export const RoutedContent = () => {
    const [currentUserType, setCurrentUserType] = useState('');

    useEffect(() => {
        if (!currentUserType) {
            getCurrentUserType();
        }
    }, []);

    const currentUser = useContext(UserContext);

    const getCurrentUserType = async () => {
        let currentUserDoc = await db.collection('users').doc(currentUser.uid).get();
        currentUserDoc = currentUserDoc.data();
        setCurrentUserType(currentUserDoc['type']);
    };

    return (
        <Switch>
            <Route path="/demo" component={APIDemo} />
            <Route path="/link-demo" component={LinkDemo} />

            <Redirect from="/" to="/dashboards/projects" exact />
            <Route path="/dashboards/analytics" exact component={Analytics} />
            <Route path="/dashboards/projects" exact component={ProjectsDashboard} />
            <Route path="/dashboards/system" exact component={System} />
            <Route path="/dashboards/monitor" exact component={Monitor} />
            <Route path="/dashboards/financial" exact component={Financial} />
            <Route path="/dashboards/stock" exact component={Stock} />
            <Route path="/dashboards/reports" exact component={Reports} />

            <Route path='/widgets' exact component={Widgets} />

            { /*    Cards Routes     */ }
            <Route path='/cards/cards' exact component={Cards} />
            <Route path='/cards/cardsheaders' exact component={CardsHeaders} />

            { /*    Layouts     */ }
            <Route path='/layouts/navbar' component={NavbarOnly} />
            <Route path='/layouts/sidebar' component={SidebarDefault} />
            <Route path='/layouts/sidebar-a' component={SidebarA} />
            <Route path="/layouts/sidebar-with-navbar" component={SidebarWithNavbar} />
            <Route path='/layouts/dnd-layout' component={DragAndDropLayout} />

            { /*    Interface Routes   */}
            <Route component={Accordions} path="/interface/accordions" />
            <Route component={Alerts} path="/interface/alerts" />
            <Route component={Avatars} path="/interface/avatars" />
            <Route component={BadgesLabels} path="/interface/badges-and-labels" />
            <Route component={Breadcrumbs} path="/interface/breadcrumbs" />
            <Route component={Buttons} path="/interface/buttons" />
            <Route component={Colors} path="/interface/colors" />
            <Route component={Dropdowns} path="/interface/dropdowns" />
            <Route component={Images} path="/interface/images" />
            <Route component={ListGroups} path="/interface/list-groups" />
            <Route component={MediaObjects} path="/interface/media-objects" />
            <Route component={Modals} path="/interface/modals" />
            <Route component={Navbars} path="/interface/navbars" />
            <Route component={Paginations} path="/interface/paginations" />
            <Route component={ProgressBars} path="/interface/progress-bars" />
            <Route component={TabsPills} path="/interface/tabs-pills" />
            <Route component={TooltipPopovers} path="/interface/tooltips-and-popovers" />
            <Route component={Typography} path="/interface/typography" />
            <Route component={Notifications} path="/interface/notifications" />
            <Route component={CropImage} path="/interface/crop-image" />
            <Route component={DragAndDropElements} path="/interface/drag-and-drop-elements" />
            <Route component={Calendar} path="/interface/calendar" />

            { /*    Graphs Routes   */}
            <Route component={ReCharts} path="/graphs/re-charts" />

            { /*    Tables Routes   */}
            <Route component={Tables} path="/tables/tables" />
            <Route component={ExtendedTable} path="/tables/extended-table" />
            <Route component={AgGrid} path="/tables/ag-grid" />

            { /*    Pages Routes    */}
            <Route path="/pages/user-approval">
                <React.Suspense fallback={<PageLoader />}>
                    {currentUserType == 'admin' ?
                        <UserApproval /> :
                        <Error404 />}
                </React.Suspense>
            </Route>
            <Route component={ComingSoon} path="/pages/coming-soon" />
            <Route component={Confirmation} path="/pages/confirmation" />
            <Route component={Danger} path="/pages/danger" />
            <Route component={Error404} path="/pages/error-404" />
            <Route component={ForgotPassword} path="/pages/forgot-password" />
            <Route component={LockScreen} path="/pages/lock-screen" />
            <Route component={Login} path="/pages/login" />
            <Route component={Register} path="/pages/register" />
            <Route component={Success} path="/pages/success" />
            <Route component={Timeline} path="/pages/timeline" />

            <Route path='/icons' exact component={Icons} />

            { /*    404    */}
            <Redirect to="/pages/error-404" />
        </Switch>
    );
};

//------ Custom Layout Parts --------
export const RoutedNavbars = () => (
    <Switch>
        { /* Other Navbars: */}
        <Route
            component={SidebarANavbar}
            path="/layouts/sidebar-a"
        />
        <Route
            component={NavbarOnly.Navbar}
            path="/layouts/navbar"
        />
        <Route
            component={SidebarWithNavbar.Navbar}
            path="/layouts/sidebar-with-navbar"
        />
        { /* Default Navbar: */}
        <Route
            component={DefaultNavbar}
        />
    </Switch>
);

export const RoutedSidebars = () => (
    <Switch>
        { /* Other Sidebars: */}
        <Route
            component={SidebarASidebar}
            path="/layouts/sidebar-a"
        />
        <Route
            component={SidebarWithNavbar.Sidebar}
            path="/layouts/sidebar-with-navbar"
        />
        { /* Default Sidebar: */}
        <Route
            component={DefaultSidebar}
        />
    </Switch>
);
