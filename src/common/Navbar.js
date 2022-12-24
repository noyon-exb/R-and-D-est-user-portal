import React, { useState } from 'react';
import {
    Box,
    Button,
    Flex,
    Image,
    Spacer,
    Text,
    //useMediaQuery,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import logo from '../assets/logo.svg';

function Navbar({ t }) {
    //const [isLargerThan600] = useMediaQuery('(min-width: 600px)');
    const [username] = useState('Admin user');

    function onClickNavigateToLoginPage() {}

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            pl={10}
            pr={5}
            w="100%"
            h="85px"
            bgColor="#494F5B"
            zIndex={200}
        >
            <Flex>
                <Box p="24px">
                    <Flex direction="row">
                        <Image
                            w="177px"
                            h="29px"
                            src={logo}
                            alt="Application logo page"
                        />
                    </Flex>
                </Box>

                <Spacer />

                <Box p="24px">
                    <Flex direction="row" color="#FFF">
                        <Box pt="8px" pr="16px">
                            <Text as="b" fontSize="14px" pt="10px">
                                {username}
                            </Text>
                        </Box>

                        <Button
                            color="#FFFFFF"
                            bgColor="#494F5B"
                            fontSize="14px"
                            border="1px solid"
                            borderColor="#FFFFFF"
                            _hover={{ bgColor: '#494F5B !important' }}
                            onClick={onClickNavigateToLoginPage}
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
