import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormManagement from '../../apiservices/form-management';
import { useInformation } from '../../contexts/informationContext';
import FormContainer from './FormContainer';

const SelectJSONSchema = () => {
    const {
        state: { jsonSchema, isDataLoading },
        dispatch,
    } = useInformation();
    const { formId } = useParams();
    const [error, setError] = useState(null);
    // const [isDataLoading, setDataLoading] = useState(false);
    const [mergeSchema, setMergeSchema] = useState(null);
    console.log(mergeSchema);
    console.log(isDataLoading);

    useEffect(() => {
        // step 1: if the schema already in context (checked formId), then go to final step 5.
        // step 2: check local storage with formID if found then goto 4th step otherwise step 3
        // step 3: api call with formId. If not found in localStorage, then save schema into localStorage
        // step 4: save schema into context
        // step 5: end

        let schemaFoundAtLocalStorage = localStorage.getItem(formId);
        setError(null);
        if (schemaFoundAtLocalStorage && !jsonSchema) {
            dispatch({
                type: 'FORM_SCHEEMA_JSON',
                payload: JSON.parse(schemaFoundAtLocalStorage),
            });
        } else if (schemaFoundAtLocalStorage) {
            dispatch({
                type: 'FORM_SCHEEMA_JSON',
                payload: JSON.parse(schemaFoundAtLocalStorage),
            });
        } else {
            fetchJsonSchemaFormServer();
        }
        // step 1: get form data depends on formId
        // step 2: mapping get form data with jsonSchema
        mergeFormWithData();
    }, [formId]);

    const fetchJsonSchemaFormServer = async () => {
        dispatch({ type: 'SET_DATA_LOADING', payload: true });
        //setDataLoading(true);
        try {
            const response = await FormManagement.getForm();
            localStorage.setItem(response.formId, JSON.stringify(response));
            dispatch({
                type: 'FORM_SCHEEMA_JSON',
                payload: response,
            });
            dispatch({ type: 'SET_DATA_LOADING', payload: false });
            //setDataLoading(false);
        } catch (_err) {
            setError(_err.message);
            dispatch({ type: 'SET_DATA_LOADING', payload: false });
            //setDataLoading(false);
        }
    };

    // useEffect(() => {

    //     mergeFormWithData();
    // }, [formId, isLoading]);

    const mergeFormWithData = async () => {
        let newSchemaObject = jsonSchema;
        //console.log(newSchemaObject);
        dispatch({ type: 'SET_DATA_LOADING', payload: true });
        //setDataLoading(true);
        setError(null);
        try {
            const getServerResponseData = await FormManagement.getFormData();
            dispatch({
                type: 'FORM_SERVER_DATA',
                payload: getServerResponseData,
            });

            for (let eachQuestionData of getServerResponseData.properties) {
                const { serial } = eachQuestionData;
                //console.log(serial - 1);
                let jsonQuesionDetails = jsonSchema.properties[serial - 1];
                //console.log(jsonQuesionDetails);
                let newGridValue = jsonQuesionDetails.gridValue;
                //console.log(newGridValue);
                for (let gridData of eachQuestionData.gridValue) {
                    const { value, index } = gridData;
                    //console.log('---> ', id, value, index);
                    newGridValue[index].value = value;
                    newGridValue[index].defaultValue = value;
                    console.log(value, index);

                    //const newGridObject = [];
                    // for (let schemaPropertiesQuestion of newSchemaObject.properties) {
                    //     if (eachQuestionData.id !== schemaPropertiesQuestion.id)
                    //         continue;
                    //     for (let gridOfSchema of schemaPropertiesQuestion.gridValue) {
                    //         if (gridOfSchema.id === id) {
                    //             gridOfSchema.value = value;
                    //             gridOfSchema.defaultValue = value;
                    //             //newGridObject.push(newGridOfSchema);
                    //         }
                    //     }
                    // }
                }
                newSchemaObject.properties[serial - 1].gridValue = newGridValue;
            }

            setMergeSchema(newSchemaObject);
            dispatch({
                type: 'FORM_SCHEEMA_JSON',
                payload: newSchemaObject,
            });
            dispatch({ type: 'SET_DATA_LOADING', payload: false });
            //setDataLoading(false);
        } catch (_err) {
            setError(_err.message);
            dispatch({ type: 'SET_DATA_LOADING', payload: false });
            //setDataLoading(false);
        }
    };

    if (isDataLoading) {
        console.log('loaded....');
        return (
            <Text justifyContent="center" align="center">
                {'Loading......'}
            </Text>
        );
    }

    if (error) {
        console.log('error....');
        return (
            <Text justifyContent="center" align="center">
                {error}
            </Text>
        );
    }

    return (
        <Box>{mergeSchema && <FormContainer jsonSchema={mergeSchema} />}</Box>
    );
};

export default SelectJSONSchema;
