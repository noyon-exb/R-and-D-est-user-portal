import { Box, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

function InputField({ component, register }) {
    return (
        <Box py="10px" pr="10px">
            <FormControl>
                <FormLabel
                    fontSize="14px"
                    htmlFor={component.textType}
                    fontWeight={600}
                >
                    {component.label ? component.label : null}
                </FormLabel>
                <Flex direction="column">
                    <Input
                        {...register(component.id)}
                        autoComplete="off"
                        name={component.id}
                        type={component.textType}
                        defaultValue={component.defaultValue}
                        placeholder={component.placeholder}
                        _placeholder={{
                            fontSize: '14px',
                            color: '#6B7280',
                        }}
                        w="100%"
                        h="46px"
                        borderRadius="9px"
                        bg="#F9FAFB"
                        border="1px solid #BEC2C9"
                        _focusVisible={{
                            border: '1px solid #D1D5DB !important',
                        }}
                    />
                </Flex>
            </FormControl>
        </Box>
    );
}

InputField.propTypes = {
    component: PropTypes.object.isRequired,
    register: PropTypes.func,
};

export default InputField;
