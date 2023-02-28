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
        label: 'First form',
        lShow: 'form1/companyDetails',
        path: '/form/company-details/1',
        color: '#FFFFFF',
        icon: <Image src={chartPie} alt="menu bar icon" />,
    },
    {
        label: 'Second form',
        lShow: 'form2/companyDetails',
        path: '/form/company-details/2',
        color: '#FFFFFF',
        icon: <Image src={chartPie} alt="menu bar icon" />,
    },
];

export default MenubarData;
