import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useInformation } from '../../contexts/informationContext';
import FormContainer from './FormContainer';

const SelectJSONSchema = () => {
    const { formId } = useParams();
    const { state } = useInformation();
    const [selectedJsonSchema, setSelectedJsonSchema] = useState(null);
    useEffect(() => {
        for (let key in state) {
            let obj = state[key];
            if (obj.formId && obj.formId == formId) {
                setSelectedJsonSchema(obj);
                break;
            } else setSelectedJsonSchema(null);
        }
    }, [selectedJsonSchema, formId]);
    return (
        <Box>
            {selectedJsonSchema ? (
                <FormContainer jsonSchema={selectedJsonSchema} />
            ) : (
                <Text>{'Loading......'}</Text>
            )}
        </Box>
    );
};

export default SelectJSONSchema;
