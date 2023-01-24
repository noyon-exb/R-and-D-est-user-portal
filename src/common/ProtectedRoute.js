import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Menubar from './Menubar';
import { Box, Show, Hide } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import MobileMenubar from './MobileMenubar';
import { TOKEN_KEY } from '../constants/basicConstants';

function ProtectedRoute({ children }) {
    const email = 'noyon@exabyting.com';
    const [authed] = useState(email !== null);

    if (authed === true && localStorage.getItem(TOKEN_KEY)) {
        location.reload();
    }

    return (
        <>
            {authed ? (
                <>
                    <Navbar />
                    <Box h="100vh" display="flex" overflow="hidden">
                        <Show above="md">
                            <Menubar />
                        </Show>

                        <Box
                            w="full"
                            pt={4}
                            px={0}
                            bg="#F2F2F2"
                            overflowY="auto"
                        >
                            {children}
                        </Box>
                    </Box>

                    <Hide above="md">
                        <MobileMenubar />
                    </Hide>
                </>
            ) : (
                <Navigate to="/login" replace={true} />
            )}
        </>
    );
}

ProtectedRoute.propTypes = {
    children: PropTypes.object.isRequired,
};

export default ProtectedRoute;
