/**
 * Copyright (c) 2018 Andrew Choung
 */
import React from 'react';
import GitHubIcon from '../images/GitHub';
import LinkedInIcon from '../images/LinkedIn';

export const APP_BAR_TITLE = 'Andrew\'s CSV Datatable';

export const TOOLBAR_ITEMS = [
    {
        id: 'github',
        name: 'My GitHub',
        url: 'https://github.com/achoung/react-tic-tac-toe',
        icon: <GitHubIcon />,
    }, {
        id: 'linkedin',
        name: 'My LinkedIn',
        url: 'https://www.linkedin.com/in/achoung/',
        icon: <LinkedInIcon />,
    },
];
