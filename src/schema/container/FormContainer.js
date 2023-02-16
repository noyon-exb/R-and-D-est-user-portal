import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../component/InputField';
import PropTypes from 'prop-types';

function FormContainer({ jsonSchema }) {
    const components = jsonSchema.properties;
    let page = 1;

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

    return (
        <Flex w="100%" h="100vh" direction="column" px="10%" my="50px">
            <form onSubmit={handleSubmit(onSubmit)}>
                {components.map((component, index) => {
                    const questionPerPage = jsonSchema.questionPerPage;
                    if (
                        index >= page * questionPerPage &&
                        index <= page * questionPerPage + questionPerPage - 1
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

                <Button
                    type="submit"
                    float="right"
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
            </form>
        </Flex>
    );
}

FormContainer.propTypes = {
    jsonSchema: PropTypes.object,
};

export default FormContainer;
