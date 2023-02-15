import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../component/InputField';
import PropTypes from 'prop-types';

function FormContainer({ jsonSchema }) {
    const components = jsonSchema.properties;

    const {
        handleSubmit,
        register,
        formState: { isValid },
    } = useForm({
        mode: 'all',
    });

    const onSubmit = values => {
        //console.log(values);
        let requestObject = {};
        //no need this map
        components.map(data => {
            requestObject[data.id] = values[data.id];
        });
        //console.log('requestObject: ', requestObject);
        let newObject = components;
        for (let component of components) {
            //console.log('components: ', component);
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
                    if (component.type === 'input') {
                        return (
                            <InputField
                                key={index}
                                component={component}
                                register={register}
                            />
                        );
                    }
                    // else if (component.type === 'xyz') {
                    //     return (
                    //         <PerformanceIndiator
                    //             key={index}
                    //             component={component}
                    //             setValue={setValue}
                    //         />
                    //     );
                    // }
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
