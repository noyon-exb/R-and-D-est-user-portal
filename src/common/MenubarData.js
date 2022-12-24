import React from 'react';
import * as IoIcons from 'react-icons/io';

const ICON_SIZE = 24;
const MenubarData = [
    {
        label: 'Demo Link Omnl 1',
        lShow: 'Demo1',
        path: '/demo1',
        color: '#FFFFFF',
        icon: <IoIcons.IoMdClipboard size={ICON_SIZE} />,
    },
    {
        label: 'Demo Link 2',
        lShow: 'Demo2',
        path: '/demo2',
        color: '#FFFFFF',
        icon: <IoIcons.IoMdPeople size={ICON_SIZE} />,
    },
    {
        label: 'User Management',
        lShow: 'User-management',
        path: '/user-management',
        color: '#FFFFFF',
        icon: <IoIcons.IoMdPerson size={ICON_SIZE} />,
    },
];

export default MenubarData;
