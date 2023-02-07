import React from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

function ProtectedRoute() {
    return (
        <Box h="100vh" display="flex" overflow="hidden">
            <Box w="full" px={0} bg="#F2F2F2" overflowY="auto">
                <Outlet />
            </Box>
        </Box>
    );
}

export default ProtectedRoute;
