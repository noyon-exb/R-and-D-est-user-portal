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
        // step 1: if the schema already in context (checked formId), then go to final step 5.
        // step 2: check local storage with formID if found then goto 3rd step otherwise step 2
        // step 3: api call with formId if not found in localStorage, then save schema into localStorage
        // step 4: save schema into context
        // step 5: end
    }, [selectedJsonSchema, formId]);

    useEffect(() => {
        // step 1: get form data depends on formId
        // step 2: mapping get form data with jsonSchema
    }, [formId]);

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
