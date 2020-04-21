import React from 'react';
import PropTypes from 'prop-types';

import {
    Layout,
    ThemeSelector,
    ThemeProvider,
    PageConfigConsumer,
} from './../components';

import './../styles/bootstrap.scss';
import './../styles/main.scss';
import './../styles/plugins/plugins.scss';
import './../styles/plugins/plugins.css';

import {
    RoutedNavbars,
    RoutedSidebars,
} from './../routes';
import { db } from '../firebase/firebase';

const favIcons = [
    { rel: 'icon', type: 'image/x-icon', href: require('./../images/favicons/favicon.ico') },

    { rel: 'apple-touch-icon', sizes: '180x180', href: require('./../images/favicons/apple-touch-icon.png') },

    { rel: 'icon', type: 'image/png', sizes: '32x32', href: require('./../images/favicons/favicon-32x32.png') },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: require('./../images/favicons/favicon-16x16.png') }
];

const Centering = {
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'height': '100vh',
};

const Box = {
    'width': '500px',
}

class AppLayout extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired
    }

    state = {
        userType: null,
    }

    async componentDidMount() {
        let currentUserDoc = await db.collection('users').doc(this.props.user.uid).get();
        currentUserDoc = currentUserDoc.data();
        this.setState({
            userType: currentUserDoc['type']
        });
    }

    render() {
        const { children } = this.props;

        return (
            this.state.userType ?
                this.state.userType != 'unverified' && this.state.userType != 'ignore' ?
                    <ThemeProvider initialStyle="light" initialColor="primary">
                        <Layout sidebarSlim favIcons={favIcons}>
                            { /* --------- Navbar ----------- */}
                            <Layout.Navbar>
                                <RoutedNavbars />
                            </Layout.Navbar>
                            { /* -------- Sidebar ------------*/}
                            <Layout.Sidebar>
                                <RoutedSidebars />
                            </Layout.Sidebar>

                            { /* -------- Content ------------*/}
                            <Layout.Content>
                                {children}
                            </Layout.Content>

                            { /* -- Theme Selector (DEMO) ----*/}
                            <PageConfigConsumer>
                                {
                                    ({ sidebarHidden, navbarHidden }) => (
                                        <ThemeSelector styleDisabled={sidebarHidden && navbarHidden} />
                                    )
                                }
                            </PageConfigConsumer>
                        </Layout>
                    </ThemeProvider>
                    :
                    <div style={Centering}>
                        <div style={Box}>
                            <h1>Awaiting Admin Approval</h1>
                        </div>
                    </div>
                : null
        );
    }
}

export default AppLayout;
