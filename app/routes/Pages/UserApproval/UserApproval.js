import React from 'react';

import {
    Container,
    Row,
    Col,
    Card,
    Table,
} from '../../../components';

import { HeaderMain } from "../../components/HeaderMain";

import { UserTable } from "./UserTable";

const UserApproval = () => (
    <React.Fragment>
        <Container>
            <HeaderMain
                title="User Approval"
                className="mb-5 mt-4"
            />
            <Row>
                <Col lg={12}>
                    <Card className="mb-3">
                        <Table className="mb-0" responsive>
                            <thead>
                                <tr>
                                    <th className="bt-0 align-middle" style={{paddingLeft: '3.65rem'}}>User</th>
                                    <th className="bt-0 align-middle text-center    ">
                                        Actions
                                    </th>                                    
                                </tr>
                            </thead>
                            <tbody>
                                <UserTable />
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
        </Container>
    </React.Fragment>
);

export default UserApproval;
