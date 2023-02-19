import { Image } from '@chakra-ui/react';
import chartPie from '../assets/chart-pie.svg';

const MenubarData = [
    {
        label: 'Home page',
        lShow: 'Home page',
        path: '/',
        color: '#FFFFFF',
        icon: <Image src={chartPie} alt="menu bar icon" />,
    },
    {
        label: 'ESG Dashboard',
        lShow: 'ESG Dashboard/companyDetails',
        path: '/form/company-details/1',
        color: '#FFFFFF',
        icon: <Image src={chartPie} alt="menu bar icon" />,
    },
    {
        label: 'User Management',
        lShow: 'User-management',
        path: 'user-management',
        color: '#FFFFFF',
        icon: <Image src={chartPie} alt="menu bar icon" />,
    },
];

export default MenubarData;
