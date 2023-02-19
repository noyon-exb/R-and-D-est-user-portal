import React, { useState } from 'react';
import { Box, Button, Flex, Image, Spacer, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import logo from '../assets/logo-with-text.svg';
import { USERNAME_KEY } from '../constants/basicConstants';

function Navbar({ t }) {
    localStorage.setItem(USERNAME_KEY, 'Mr. Jhon deo carl');
    const [username] = useState(localStorage.getItem(USERNAME_KEY));

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            pl={10}
            pr={5}
            w="100%"
            h="65px"
            bgColor="#494F5B"
            zIndex={200}
        >
            <Flex>
                <Box p="16px" ml="35px">
                    <Flex direction="row">
                        <Image
                            w="140px"
                            h="23px"
                            src={logo}
                            alt="Application logo with text"
                        />
                    </Flex>
                </Box>

                <Spacer />

                <Box p="12px">
                    <Flex direction="row" color="#FFF">
                        <Box pt="8px" pr="16px">
                            <Text as="b" fontSize="14px" pt="10px">
                                {username}
                            </Text>
                        </Box>

                        <Button
                            h="37px"
                            color="#FFFFFF"
                            bgColor="#494F5B"
                            fontSize="14px"
                            border="1px solid"
                            borderColor="#FFFFFF"
                            borderRadius="9px"
                            _hover={{ bgColor: '#494F5B !important' }}
                            onClick={() => {}}
                        >
                            {t('navbar.logout')}
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}

Navbar.propTypes = {
    t: PropTypes.func.isRequired,
};

export default withTranslation()(Navbar);
