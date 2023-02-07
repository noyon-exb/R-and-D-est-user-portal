import { Input } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

function PreviewTextField({ data }) {
    return (
        <Input
            autoComplete="off"
            defaultValue={data.value}
            _placeholder={{
                fontSize: '14px',
                color: '#6B7280',
            }}
            w="390px"
            h="46px"
            borderRadius="9px"
            bg="#FDF2F2"
            border="1px solid #D1D5DB"
            _focusVisible={{
                border: '1px solid #D1D5DB !important',
            }}
        />
    );
}

PreviewTextField.propTypes = {
    data: PropTypes.object.isRequired,
};

export default PreviewTextField;
