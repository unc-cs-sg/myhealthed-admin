import React from 'react';
import PropTypes from 'prop-types';

import {
    NavItem,
    NavLink
} from './../../components';

import { signOut } from '../../firebase/firebase';

const NavbarUser = (props) => (
    <NavItem {...props}>
        <NavLink onClick={ signOut }>
            <i className="fa fa-power-off"></i>
        </NavLink>
    </NavItem>
);
NavbarUser.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

export { NavbarUser };
