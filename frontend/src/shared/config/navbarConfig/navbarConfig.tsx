import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilVideo } from '@coreui/icons';
import { CNavItem } from '@coreui/react';
import { getRouteMain } from 'shared/const/router';

const _nav = [
    {
        component: CNavItem,
        name: 'Описание к видео',
        to: getRouteMain(),
        icon: <CIcon icon={cilVideo} customClassName="nav-icon" />,
    },
];

export default _nav;
