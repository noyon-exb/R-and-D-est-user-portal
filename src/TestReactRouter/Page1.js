import { Flex, Heading } from '@chakra-ui/react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const Page1 = ({ t }) => {
    return (
        <Flex width="100%" height="100vh" justify="center" align="center">
            <Heading>{t('page1.welcomeText')}</Heading>
        </Flex>
    );
};

Page1.propTypes = {
    t: PropTypes.func.isRequired,
};

export default withTranslation()(Page1);
