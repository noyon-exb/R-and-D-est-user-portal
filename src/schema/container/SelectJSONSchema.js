import { Box, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useInformation } from '../../contexts/informationContext';
import FormContainer from './FormContainer';

const SelectJSONSchema = () => {
    const { formId } = useParams();
    console.log(formId);
    const {
        state: { jsonSchema },
        dispatch,
    } = useInformation();
    // useEffect(() => {
    //     // step 1: if the schema already in context (checked formId), then go to final step 5.
    //     // step 2: check local storage with formID if found then goto 3rd step otherwise step 2
    //     // step 3: api call with formId if not found in localStorage, then save schema into localStorage
    //     // step 4: save schema into context
    //     // step 5: end
    // }, [formId]);

    useEffect(() => {
        // step 1: get form data depends on formId
        // step 2: mapping get form data with jsonSchema
        let newObject = jsonSchema;
        var getServerResponseData = require('../getCompanyDetails.json');
        dispatch({
            type: 'FORM_SERVER_DATA',
            payload: getServerResponseData,
        });
        console.log('hell');
        for (let dataKey of getServerResponseData.data) {
            for (const [index, schemaKey] of jsonSchema.properties.entries()) {
                if (dataKey.id === schemaKey.id) {
                    let x = jsonSchema.properties[index];
                    x.defaultValue = dataKey.value;
                    x.value = dataKey.value;
                    newObject.properties[index] = x;
                    break;
                }
            }
        }
        console.log(newObject);
        dispatch({
            type: 'FORM_SCHEEMA_JSON',
            payload: newObject,
        });
    }, []);

    return (
        <Box>
            {jsonSchema ? (
                <FormContainer jsonSchema={jsonSchema} />
            ) : (
                <Text>{'Loading......'}</Text>
            )}
        </Box>
    );
};

export default SelectJSONSchema;
