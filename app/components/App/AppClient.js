import React, { useContext, useEffect, useState } from 'react';
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom';

import AppLayout from './../../layout/default';
import { RoutedContent } from './../../routes';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { UserContext } from "../../providers/UserProvider";
import auth, { googleSignIn } from '../../firebase/firebase';

const uiConfig = {
    signInOptions: [googleSignIn],
    credentialHelper: 'none'
};

const basePath = process.env.BASE_PATH || '/';

const LoginBox = {
    'width': '365px',
}

const AppClient = () => {
    const [hidden, setHidden] = useState({
        'display': 'none',
        'alignItems': 'center',
        'justifyContent': 'center',
        'height': '100vh',
    });

    useEffect(() => {
        setTimeout(function () {
            show()
        }, 500)
    }, []);

    const show = () => {
        !user && setHidden({
            'display': 'flex',
            'alignItems': 'center',
            'justifyContent': 'center',
            'height': '100vh',
        });
    }

    const user = useContext(UserContext);
    return (
        user ?
            <Router basename={basePath}>
                <AppLayout user={user}>
                    <RoutedContent />
                </AppLayout>
            </Router>
            :
            <div style={hidden} >
                <div style={LoginBox}>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
                </div>
            </div>
    );
}

export default hot(module)(AppClient);