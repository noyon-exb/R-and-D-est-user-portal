import { Checkbox, Flex } from '@chakra-ui/react';
import React from 'react';
import TextField from './TextField';
import PropTypes from 'prop-types';

function KeyValueInputField({ data, register, errors }) {
    return (
        <Flex direction="row">
            <Checkbox />
            <TextField
                data={data.components.key}
                register={register}
                errors={errors}
            />
            <TextField
                data={data.components.value}
                register={register}
                errors={errors}
            />
        </Flex>
    );
}

KeyValueInputField.propTypes = {
    data: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

export default KeyValueInputField;
