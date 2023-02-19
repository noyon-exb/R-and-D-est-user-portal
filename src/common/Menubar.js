import { Box, Flex, Stack } from '@chakra-ui/react';
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
                    color={item.color}
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
                flexShrink={0}
                flexGrow={0}
                bg="#494F58"
                zIndex={100}
            >
                <Box mx="14px">
                    <Stack pt={10} mt={8}>
                        <Stack spacing={2}>{printNavLink()}</Stack>
                    </Stack>
                </Box>
            </Flex>
        </>
    );
}

export default Menubar;
