import { Button, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../component/InputField';
import PropTypes from 'prop-types';

function FormContainer({ jsonSchema }) {
    const components = jsonSchema.properties;
    const questionPerPage = jsonSchema.questionPerPage;
    const totalQuestion = jsonSchema.properties.length;
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

        let newObject = components;
        for (let component of components) {
            for (let val in values) {
                if (val === component.id) {
                    component.value = values[val];
                }
                newObject[component.serial - 1] = component;
            }
        }
        console.log(newObject);
    };

    const increasePageNoHandler = () => {
        setPageNo(prev => prev + 1);
    };

    const decreasePageNoHandler = () => {
        setPageNo(prev => prev - 1);
    };

    //useEffect(() => {}, [pageNo]);

    return (
        <Flex w="100%" h="100vh" direction="column" px="10%" my="50px">
            <form onSubmit={handleSubmit(onSubmit)}>
                {components.map((component, index) => {
                    if (
                        index >= pageNo * questionPerPage &&
                        index <= pageNo * questionPerPage + questionPerPage - 1
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
                    totalQuestion - (totalQuestion % questionPerPage) + 1 ? (
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
        </Flex>
    );
}

FormContainer.propTypes = {
    jsonSchema: PropTypes.object,
};

export default FormContainer;
