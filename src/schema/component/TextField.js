import {
    Box,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

function TextField({ data, register, errors }) {
    // const setRegexIfFound = obj => {
    //     const obj1 = obj;
    //     const regex = new RegExp(obj.pattern.value);
    //     if (regex) {
    //         obj1.pattern['value'] = regex;
    //     }
    //     return obj;
    // };
    return (
        <Box>
            <FormControl isInvalid={errors[data.id]}>
                <FormLabel fontSize="14px" htmlFor={data.textType}>
                    {data.label}
                </FormLabel>
                <Flex direction="column">
                    <Input
                        {...register(data.id)}
                        // autoComplete="off"
                        // name={data.id}
                        // type={data.textType}
                        // defaultValue={data.value}
                        // placeholder={data.placeholder}
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
                </Flex>
                <FormErrorMessage width="100%">
                    {errors[data.id] && errors[data.id].message}
                </FormErrorMessage>
            </FormControl>
        </Box>
    );
}

TextField.propTypes = {
    data: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

export default TextField;
