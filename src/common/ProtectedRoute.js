import React from 'react';
import { Box, Show } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Menubar from './Menubar';
import Navbar from './Navbar';

function ProtectedRoute() {
    return (
        <>
            <Box h="100vh" display="flex" overflow="hidden">
                <Navbar />
                <Show above="md">
                    <Menubar />
                </Show>
                <Box
                    w="full"
                    px={0}
                    bg="#F2F2F2"
                    overflow="auto"
                    mt="65"
                    pt="4px"
                >
                    <Outlet />
                </Box>
            </Box>
        </>
    );
}

export default ProtectedRoute;
