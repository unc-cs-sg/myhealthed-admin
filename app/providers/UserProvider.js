import React, { Component, createContext } from "react";
import auth from '../firebase/firebase.js';

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
    state = {
        user: null
    };

    componentDidMount = () => {
        this._isMounted = true;
        auth.onAuthStateChanged(userAuth => {
            this._isMounted && this.setState({ user: userAuth })
        })
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render() {
        return(
            <UserContext.Provider value={this.state.user}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default UserProvider;