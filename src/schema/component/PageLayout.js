import { Box, Flex, Image, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import leftArrowCircle from '../../assets/leftArrowCircle.svg';
import PropTypes from 'prop-types';

const PageLayout = ({
    pageNo,
    formTitle,
    totalPage,
    decreasePageNoHandler,
}) => {
    return (
        <Flex direction="row" my="25px">
            {pageNo > 0 ? (
                <Image
                    ml="16px"
                    mr="8px"
                    cursor="pointer"
                    src={leftArrowCircle}
                    alt="Left arrow circle"
                    onClick={decreasePageNoHandler}
                />
            ) : null}
            <Text fontWeight={700} fontSize="26px" color="#1F2A37">
                {formTitle}
            </Text>
            <Spacer />
            <Box
                w="142px"
                h="28px"
                fontWeight={400}
                fontSize="10px"
                color="#616875"
                borderRadius="8px"
                py="6px"
                px="8px"
                border="1px solid #D1D5DB"
                bg="#F3F4F6"
            >{`Company Details Page ${pageNo + 1}/${totalPage}`}</Box>
        </Flex>
    );
};

PageLayout.propTypes = {
    pageNo: PropTypes.number.isRequired,
    formTitle: PropTypes.string.isRequired,
    totalPage: PropTypes.number.isRequired,
    decreasePageNoHandler: PropTypes.func.isRequired,
};

export default PageLayout;
