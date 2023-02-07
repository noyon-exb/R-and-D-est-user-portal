import { Box, Flex, FormControl, FormLabel, Select } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

function DropDown({ data, register }) {
    return (
        <Box>
            <FormControl>
                <FormLabel fontSize="14px">{data.label}</FormLabel>
                <Flex direction="column">
                    <Select
                        {...register(data.id)}
                        placeholder="Select Designation"
                        borderColor="#DDDDDD"
                        color="#464646"
                        w="390px"
                        h="46px"
                        borderRadius="9px"
                        bg="#FDF2F2"
                        border="1px solid #D1D5DB"
                        _focusVisible={{
                            border: '1px solid #D1D5DB !important',
                        }}
                        _focus={{ borderColor: '#DDDDDD !important' }}
                        _placeholder={{ color: '#DDDDDD !important' }}
                    >
                        {data.values.map((value, index) => (
                            <option value={value} key={index}>
                                {value}
                            </option>
                        ))}
                    </Select>
                </Flex>
            </FormControl>
        </Box>
    );
}

DropDown.propTypes = {
    data: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
};

export default DropDown;
