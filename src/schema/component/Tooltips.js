import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@chakra-ui/react';

function Tooltips({ text }) {
    return (
        <Tooltip
            hasArrow
            placement="top"
            label={text}
            cursor="pointer"
            bg="#FFFFFF"
            color="#4F4F4F"
            borderRadius="5px"
            arrowShadowColor="#BDBDBD"
            border="1px solid #BDBDBD"
            boxShadow="0px 3px 4px rgba(0, 0, 0, 0.15)"
        >
            {'tooltip'}
        </Tooltip>
    );
}

Tooltips.propTypes = {
    text: PropTypes.string,
};

export default Tooltips;
