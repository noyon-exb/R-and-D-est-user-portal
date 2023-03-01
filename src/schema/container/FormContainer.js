import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Spacer,
    Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import QuestionHeading from '../component/QuestionHeading';
import SelectedComponent from '../component/SelectedComponent';
import PageLayout from '../component/PageLayout';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useInformation } from '../../contexts/informationContext';
import FormManagement from '../../apiservices/form-management';

function FormContainer({ jsonSchema }) {
    const {
        state: { serverData, isDataLoading },
        dispatch,
    } = useInformation();

    const components = jsonSchema.properties;
    const questionPerPage = jsonSchema.questionPerPage;
    const totalQuestion = jsonSchema.properties.length;
    const totalPage = Math.ceil(totalQuestion / questionPerPage);
    const [pageNo, setPageNo] = useState(0);
    const nextButtonRenderCondition =
        pageNo >= 0 &&
        (pageNo + 1) * questionPerPage <
            totalQuestion -
                (totalQuestion % questionPerPage) +
                (totalQuestion % questionPerPage) >
            0;

    const { handleSubmit, register, setValue } = useForm({
        mode: 'all',
    });

    const makeRequestPayload = (payload, inputValues) => {
        let newRequestPayload = { ...payload, properties: payload.properties };

        for (let inputKey in inputValues) {
            const inputValue = inputValues[inputKey];
            for (let dataKey of payload.properties) {
                const { serial } = dataKey;

                if (inputKey.split('/')[0] !== dataKey.id.split('/')[0]) {
                    continue;
                }

                for (let gridKey of dataKey.gridValue) {
                    const { id, index } = gridKey;

                    if (id === inputKey) {
                        newRequestPayload.properties[serial - 1].gridValue[
                            index
                        ] = {
                            ...gridKey,
                            value: inputValue,
                        };
                    }
                }
            }
        }
        return newRequestPayload;
    };

    const onSubmit = async values => {
        const payload = makeRequestPayload(serverData, values);
        dispatch({ type: 'SET_DATA_LOADING', payload: true });
        try {
            const response = await FormManagement.submitFormData(payload);
            console.log(response.message);
            dispatch({ type: 'SET_DATA_LOADING', payload: false });
        } catch (_err) {
            dispatch({ type: 'SET_DATA_LOADING', payload: false });
        }
    };

    const increasePageNoHandler = () => {
        setPageNo(prev => prev + 1);
    };

    const decreasePageNoHandler = () => {
        setPageNo(prev => prev - 1);
    };

    if (isDataLoading) {
        console.log('loading....');
        return (
            <Text justifyContent="center" align="center">
                {'Loading......'}
            </Text>
        );
    }

    return (
        <Flex w="100%" direction="column" px="40px">
            <PageLayout
                pageNo={pageNo}
                formTitle={jsonSchema.title}
                totalPage={totalPage}
                decreasePageNoHandler={decreasePageNoHandler}
            />
            <Box ml="20px" mb="50px">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {components.map((comp, index) => {
                        if (
                            index >= pageNo * questionPerPage &&
                            index <=
                                pageNo * questionPerPage + questionPerPage - 1
                        ) {
                            return (
                                <Box key={index} py="20px">
                                    <QuestionHeading
                                        serial={comp.serial}
                                        heading={comp.heading}
                                        tooltipText={comp.tooltipText}
                                        description={comp.description}
                                    />
                                    <Grid
                                        templateColumns={`repeat(${comp.col}, 1fr)`}
                                    >
                                        {comp.gridValue.map((grid, index2) => {
                                            return (
                                                <GridItem
                                                    key={index2}
                                                    colSpan={grid.columnSpan}
                                                >
                                                    <SelectedComponent
                                                        type={grid.type}
                                                        component={grid}
                                                        register={register}
                                                        setValue={setValue}
                                                    />
                                                </GridItem>
                                            );
                                        })}
                                    </Grid>
                                </Box>
                            );
                        }
                    })}

                    <Flex>
                        <Spacer />
                        {pageNo ? (
                            <Button
                                mt="30px"
                                mr="30px"
                                w="100px"
                                color="#1F2A37"
                                bg="#F2F2F2"
                                fontSize="14px"
                                fontWeight={500}
                                border="1px solid"
                                borderRadius="8px"
                                _hover={{ bg: '#F2F2F2 !important' }}
                                onClick={decreasePageNoHandler}
                            >
                                Cancel
                            </Button>
                        ) : null}
                        {nextButtonRenderCondition ? (
                            <Button
                                mt="30px"
                                mr="10px"
                                w="133px"
                                color="#FFFFFF"
                                bg="#4DA467"
                                fontSize="14px"
                                fontWeight={500}
                                border="1px solid"
                                borderRadius="8px"
                                _hover={{ bg: '#4DA467 !important' }}
                                onClick={increasePageNoHandler}
                                rightIcon={<ArrowForwardIcon h={4} w={4} />}
                            >
                                Next page
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                mt="30px"
                                mr="10px"
                                w="150px"
                                color="#FFFFFF"
                                bg="#4DA467"
                                fontSize="14px"
                                fontWeight={500}
                                border="1px solid"
                                borderRadius="8px"
                                _hover={{ bg: '#4DA467 !important' }}
                            >
                                Save &amp; Sumbit
                            </Button>
                        )}
                    </Flex>
                </form>
            </Box>
        </Flex>
    );
}

FormContainer.propTypes = {
    jsonSchema: PropTypes.object,
    mergeFormData: PropTypes.func,
};

export default FormContainer;
