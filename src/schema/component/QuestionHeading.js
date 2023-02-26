import React from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import SerialNumber from './SerialNumber';
import Tooltips from './Tooltips';

const QuestionHeading = ({ serial, heading, tooltipText, description }) => {
    return (
        <>
            <Flex direction="row">
                <SerialNumber serialNo={serial} />
                <Heading px="5px" fontSize="14px">
                    {heading}
                </Heading>
                {tooltipText ? <Tooltips text={tooltipText} /> : null}
            </Flex>
            <Text fontSize="12px">{description}</Text>
        </>
    );
};

QuestionHeading.propTypes = {
    serial: PropTypes.number.isRequired,
    heading: PropTypes.string.isRequired,
    tooltipText: PropTypes.string,
    description: PropTypes.string.isRequired,
};

export default QuestionHeading;
