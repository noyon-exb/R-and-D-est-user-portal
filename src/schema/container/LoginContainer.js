import { Button, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useInformation } from '../../contexts/informationContext';
import DropDown from '../component/DropDown';
//import KeyValueInputField from '../component/KeyValueInputField';
import TextField from '../component/TextField';

function LoginContainer() {
    const {
        state: { dynamicDesignJson },
    } = useInformation();
    const components = dynamicDesignJson.properties;
    let dropdownList = {
        userNameDropDown: ['mejhba', 'irfan', 'mia', 'noyon'],
        adminNameDropDown: ['admin1', 'admin2', 'admin3'],
    };

    const {
        handleSubmit,
        register,
        formState: { errors, isValid },
    } = useForm({
        mode: 'onChange',
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
        <Flex
            justifyContent="center"
            align="center"
            w="100%"
            h="100vh"
            direction="column"
        >
            <Heading>{dynamicDesignJson.title}</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                {components.map((data, index) => {
                    if (data.inputType === 'inputBox') {
                        return (
                            <TextField
                                key={index}
                                data={data}
                                register={register}
                                errors={errors}
                            />
                        );
                    } else if (data.inputType === 'dropdown') {
                        for (let key in dropdownList) {
                            if (key === data.id) {
                                data.values = dropdownList[key];
                            }
                        }
                        return (
                            <DropDown
                                key={index}
                                data={data}
                                register={register}
                                //errors={errors}
                            />
                        );
                    }
                    // else if (data.inputType === 'keyValueIndicator') {
                    //     return (
                    //         <KeyValueInputField
                    //             key={index}
                    //             data={data}
                    //             register={register}
                    //             errors={errors}
                    //         />
                    //     );
                    // }
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
                    Sumbit
                </Button>
            </form>
        </Flex>
    );
}

export default LoginContainer;
