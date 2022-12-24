import {
    Box,
    Flex,
    Stack,
    //useColorModeValue as mode,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavLink from './NavLink';
import MenubarData from './MenubarData';

function Menubar() {
    const location = useLocation();
    const navigate = useNavigate();

    function printNavLink() {
        return MenubarData.map((item, index) => {
            return (
                <NavLink
                    key={index}
                    //label={menubarOpen ? item.label : ''}
                    label={item.label}
                    lShow={''}
                    icon={item.icon}
                    color={''}
                    onClick={
                        item.path !== null ? () => navigate(item.path) : ''
                    }
                    isActive={
                        item.path !== null
                            ? location.pathname.includes(
                                  item.lShow.toLowerCase()
                              )
                            : ''
                    }
                />
            );
        });
    }

    return (
        <>
            <Flex
                height="100vh"
                width="250px"
                direction="column"
                //borderRightColor={mode('gray.200', 'gray.700')}
                flexShrink={0}
                flexGrow={0}
                bg="#FFFFFF"
                zIndex={100}
            >
                <Box mx="10px">
                    <Stack pt={20} spacing={6} mt={8}>
                        <Stack spacing={2}>{printNavLink()}</Stack>
                    </Stack>
                </Box>
            </Flex>
        </>
    );
}

export default Menubar;
