import { Box, Button, Flex, Image, Spacer, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../component/InputField';
import PropTypes from 'prop-types';
import leftArrowCircle from '../../assets/leftArrowCircle.svg';

function FormContainer({ jsonSchema }) {
    const components = jsonSchema.properties;
    const questionPerPage = jsonSchema.questionPerPage;
    const totalQuestion = jsonSchema.properties.length;
    const totalPage = Math.ceil(totalQuestion / questionPerPage);
    const [pageNo, setPageNo] = useState(0);

    const {
        handleSubmit,
        register,
        formState: { isValid },
    } = useForm({
        mode: 'all',
    });

    const onSubmit = values => {
        console.log(values);
        let requestObject = {};
        //no need this map
        components.map(data => {
            requestObject[data.id] = values[data.id];
        });

        // let newObject = components;
        // for (let component of components) {
        //     for (let val in values) {
        //         if (val === component.id) {
        //             component.value = values[val];
        //         }
        //         newObject[component.serial - 1] = component;
        //     }
        // }
        // //console.log(newObject);

        let serverRequestPayload = { data: [] };

        for (let component of components) {
            for (let key in values) {
                if (key === component.id) {
                    // serverRequestPayload.data = {
                    //     ...serverRequestPayload.data,
                    //     key: values[key],
                    // };

                    serverRequestPayload.data.push({
                        id: key,
                        value: values[key],
                    });
                }
            }
        }

        console.log(serverRequestPayload);
    };

    const increasePageNoHandler = () => {
        setPageNo(prev => prev + 1);
    };

    const decreasePageNoHandler = () => {
        setPageNo(prev => prev - 1);
    };

    //useEffect(() => {}, [pageNo]);

    return (
        <Flex w="100%" direction="column" px="40px">
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
                    {jsonSchema.title}
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
            <Box ml="20px" mb="50px">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {components.map((component, index) => {
                        if (
                            index >= pageNo * questionPerPage &&
                            index <=
                                pageNo * questionPerPage + questionPerPage - 1
                        ) {
                            if (component.type === 'input') {
                                return (
                                    <InputField
                                        key={index}
                                        component={component}
                                        register={register}
                                    />
                                );
                            }
                        }
                    })}

                    {pageNo > 0 ? (
                        <Button
                            type="submit"
                            mt="30px"
                            mr="10px"
                            w="100px"
                            bg="gray.400"
                            color="#FFF"
                            disabled={!isValid}
                            _disabled={{
                                cursor: 'not-allowed',
                                bg: '#D1D5DB',
                                color: '#111111',
                            }}
                            _hover={{ bg: '81C494 !important' }}
                            onClick={decreasePageNoHandler}
                        >
                            Previous page
                        </Button>
                    ) : null}

                    {pageNo >= 0 &&
                    (pageNo + 1) * questionPerPage <
                        totalQuestion -
                            (totalQuestion % questionPerPage) +
                            1 ? (
                        <Button
                            type="submit"
                            mt="30px"
                            w="100px"
                            bg="blue"
                            color="#FFF"
                            disabled={!isValid}
                            _disabled={{
                                cursor: 'not-allowed',
                                bg: '#D1D5DB',
                                color: '#111111',
                            }}
                            _hover={{ bg: '81C494 !important' }}
                            onClick={increasePageNoHandler}
                        >
                            Next page
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            mt="30px"
                            w="100px"
                            bg="#e2136e"
                            color="#FFF"
                            disabled={!isValid}
                            _disabled={{
                                cursor: 'not-allowed',
                                bg: '#D1D5DB',
                                color: '#111111',
                            }}
                            _hover={{ bg: '81C494 !important' }}
                        >
                            Save Sumbit
                        </Button>
                    )}
                </form>
            </Box>
        </Flex>
    );
}

FormContainer.propTypes = {
    jsonSchema: PropTypes.object,
};

export default FormContainer;
