/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { StatusIndicator } from '@zendeskgarden/react-avatars';
import { Row, Col } from '@zendeskgarden/react-grid';

const Status = (props) => (
    props.status === 'offline' ? (
        <Row>
            <Col textAlign="center">
            <StatusIndicator type="offline" aria-label="status: offline">
                System Status: Offline
            </StatusIndicator>
            </Col>
        </Row>
    ) : (
        <Row>
            <Col textAlign="center">
            <StatusIndicator type="online" aria-label="status: online">
                Online
            </StatusIndicator>
            </Col>
        </Row>
    )
);

export default Status;
