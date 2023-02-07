import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useInformation } from '../../contexts/informationContext';
import InputField from '../component/InputField';
import PerformanceIndiator from '../component/PerformanceIndiator';

export default function CompanyDetailsContainer() {
    const {
        state: { companyDetailsJsonSchema },
    } = useInformation();
    const components = companyDetailsJsonSchema.properties;

    const {
        handleSubmit,
        register,
        setValue,
        formState: { isValid },
    } = useForm({
        mode: 'all',
    });

    const onSubmit = values => {
        console.log(values);
        let requestObject = {};
        components.map(data => {
            requestObject[data.id] = values[data.id];
        });
        console.log('requestObject: ', requestObject);
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
                    } else if (component.type === 'xyz') {
                        return (
                            <PerformanceIndiator
                                key={index}
                                component={component}
                                setValue={setValue}
                            />
                        );
                    }
                })}

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
            </form>
        </Flex>
    );
}
