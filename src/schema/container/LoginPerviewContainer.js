import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useInformation } from '../../contexts/informationContext';
import DropDown from '../component/DropDown';
import PreviewTextField from '../component/PreviewTextField';

function LoginPerviewContainer() {
    const {
        state: { dynamicDesignJson },
    } = useInformation();
    const [response, setResponse] = useState({});
    const components = dynamicDesignJson.login.components;

    useEffect(() => {
        const obj = {
            userEmail: 'noyon@exabyting.com',
            userName: 'noyon',
        };
        setResponse(obj);
    }, []);
    return (
        <Flex
            justifyContent="center"
            align="center"
            w="100%"
            h="100vh"
            direction="column"
        >
            {components.map((data, index) => {
                for (let key in response) {
                    if (key === data.id) {
                        if (data.inputType === 'inputBox') {
                            data.value = response[key];
                            return (
                                <PreviewTextField
                                    key={index}
                                    data={data}
                                    register={{}}
                                    errors={{}}
                                />
                            );
                        }
                    }
                }
            })}

            <DropDown />
        </Flex>
    );
}

export default LoginPerviewContainer;
