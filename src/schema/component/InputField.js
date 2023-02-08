import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
} from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import SerialNumber from './SerialNumber';
import Tooltips from './Tooltips';

function InputField({ component, register }) {
    return (
        <Box py="10px">
            <Flex direction="row">
                <SerialNumber serialNo={component.serial} />
                <Heading px="5px" fontSize="14px">
                    {component.heading}
                </Heading>
                <Tooltips text={component.tooltipText} />
            </Flex>
            <Text fontSize="12px">{component.description}</Text>
            <FormControl>
                <FormLabel fontSize="14px" htmlFor={component.textType}>
                    {component.label ? component.label : null}
                </FormLabel>
                <Flex direction="column">
                    <Input
                        {...register(component.id)}
                        autoComplete="off"
                        name={component.id}
                        type={component.textType}
                        //defaultValue={data.value}
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
    register: PropTypes.func.isRequired,
};

export default InputField;
