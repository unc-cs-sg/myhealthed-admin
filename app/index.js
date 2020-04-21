import '@babel/polyfill';

import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import UserProvider from './providers/UserProvider';

render(
    <UserProvider>
        <App />
    </UserProvider>,
    document.querySelector('#root')
);
