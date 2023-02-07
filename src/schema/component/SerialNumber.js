import { Text } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

function SerialNumber({ serialNo }) {
    return <Text>{serialNo}</Text>;
}

SerialNumber.propTypes = {
    serialNo: PropTypes.number.isRequired,
};
export default SerialNumber;
