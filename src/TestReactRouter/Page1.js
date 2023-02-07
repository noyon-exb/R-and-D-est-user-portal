import { Flex, Heading, Text } from '@chakra-ui/react';
import { withTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Page1 = ({ t }) => {
    const navigate = useNavigate();
    return (
        <Flex
            width="100%"
            height="100vh"
            justify="center"
            align="center"
            direction="column"
        >
            <Heading>{t('page1.welcomeText')}</Heading>
            <Text
                cursor="pointer"
                pt="50px"
                onClick={() => navigate('/company-details')}
            >
                Navigate to company-details page
            </Text>
        </Flex>
    );
};

Page1.propTypes = {
    t: PropTypes.func.isRequired,
};

export default withTranslation()(Page1);
