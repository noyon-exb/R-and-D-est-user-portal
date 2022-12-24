import { Box, useColorModeValue as mode } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavLink from './NavLink';
import MenubarData from './MenubarData';

export default function MobileMenubar() {
    const location = useLocation();
    const navigate = useNavigate();

    function printNavLink() {
        return MenubarData.map((item, index) => {
            return (
                <NavLink
                    key={index}
                    label={''}
                    lShow={item.lShow}
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
        <Box
            position="fixed"
            bottom={0}
            left="0"
            right={0}
            zIndex={200}
            bg="#0077C0"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            h="14"
            py={2}
            paddingX={[8, 16, 16]} // [4, 16, 16]
            shadow="lg"
            borderTop="1px solid"
            borderColor={mode('gray.200', 'gray.700')}
        >
            {printNavLink()}
        </Box>
    );
}
