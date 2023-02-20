import { Box, Button, Flex, Grid, GridItem, Spacer } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import QuestionHeading from '../component/QuestionHeading';
import SelectedComponent from '../component/SelectedComponent';
import PageLayout from '../component/PageLayout';
import { ArrowForwardIcon } from '@chakra-ui/icons';

function FormContainer({ jsonSchema }) {
    const components = jsonSchema.properties;
    const questionPerPage = jsonSchema.questionPerPage;
    const totalQuestion = jsonSchema.properties.length;
    const totalPage = Math.ceil(totalQuestion / questionPerPage);
    const [pageNo, setPageNo] = useState(0);

    const { handleSubmit, register } = useForm({
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
                            const templateColumns = `repeat(${comp.col}, 1fr)`;
                            return (
                                <Box key={index} py="20px">
                                    <QuestionHeading
                                        serial={comp.serial}
                                        heading={comp.heading}
                                        tooltipText={comp.tooltipText}
                                        description={comp.description}
                                    />
                                    <Grid templateColumns={templateColumns}>
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
                        {pageNo > 0 ? (
                            <Button
                                type="submit"
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
                        {pageNo >= 0 &&
                        (pageNo + 1) * questionPerPage <
                            totalQuestion -
                                (totalQuestion % questionPerPage) +
                                1 ? (
                            <Button
                                type="submit"
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
};

export default FormContainer;
