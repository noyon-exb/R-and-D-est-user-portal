import React from 'react';
import { Box, Button, Flex, Show } from '@chakra-ui/react';
import { Outlet, useNavigate } from 'react-router-dom';
import MenubarData from './MenubarData';

function ProtectedRoute() {
    const navigate = useNavigate();

    return (
        <Box h="100vh" display="flex" overflow="hidden">
            <Show above="md">
                <Flex direction="column">
                    {MenubarData.map((data, index) => {
                        return (
                            <Button
                                key={index}
                                onClick={() =>
                                    navigate(data.path, { state: data.x })
                                }
                                bg={index % 2 == 0 ? '#e2136e' : 'green'}
                            >
                                {data.label}
                            </Button>
                        );
                    })}
                </Flex>
            </Show>
            <Box w="full" px={0} bg="#F2F2F2" overflowY="auto">
                <Outlet />
            </Box>
        </Box>
    );
}

export default ProtectedRoute;
