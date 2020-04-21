import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';

import {
    Media,
    Avatar,
    Button,
    ButtonGroup,
} from '../../../components';
import { db } from '../../../firebase/firebase';

export const UserTable = () => {
    const [users, setUsers] = useState('');

    useEffect(() => {
        if (!users) {
            getUsers();
        }
    }, []);

    const getUsers = async () => {
        let query = await db.collection("users").where("type", "==", "unverified").get();
        let docs = [];
        query.forEach((doc) => {
            docs.push(doc.data());
        });
        setUsers(docs);
    }

    const updateUserType = (user, userType) => {
        db.collection('users').doc(user['uid']).update({
            type: userType
        })
        const temp = users.filter((i) => i !== user);
        setUsers(temp);
    }

    return (
        <React.Fragment>
            {
                _.times((users || []).length, (index) => {
                    let user = users[index];
                    let userDisplayName = user.displayName.split(" ");
                    return (
                        <tr key={index}>
                            <td className="align-middle">
                                <Media>
                                    <Media left middle className="mr-3">
                                        <Avatar.Image
                                            size="md"
                                            src={user['photoURL']}
                                        />
                                    </Media>
                                    <Media body>
                                        <div className="mt-0 d-flex text-inverse">
                                            {userDisplayName[0]} {userDisplayName[1]}
                                        </div>
                                        <span>
                                            {user['email']}
                                        </span>
                                    </Media>
                                </Media>
                            </td>
                            <td className="align-middle text-center">
                                <ButtonGroup>
                                    <Button outline color="secondary" onClick={() => updateUserType(user, 'admin')}>Admin</Button>
                                    <Button outline color="secondary" onClick={() => updateUserType(user, 'volunteer')}>Volunteer</Button>
                                    <Button outline color="secondary" onClick={() => updateUserType(user, 'ignore')}>Ignore</Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    );
                })
            }
        </React.Fragment>
    );
}
