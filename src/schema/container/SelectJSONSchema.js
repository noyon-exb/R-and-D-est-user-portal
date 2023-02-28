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
    console.log(error);
    const [mergeSchema, setMergeSchema] = useState(null);

    useEffect(() => {
        // step 1: if the schema already in context (checked formId), then go to final step 5.
        // step 2: check local storage with formID if found then goto 4th step otherwise step 3
        // step 3: api call with formId. If not found in localStorage, then save schema into localStorage
        // step 4: save schema into context
        // step 5: end

        let schemaFoundAtLocalStorage = JSON.parse(
            localStorage.getItem(formId)
        );
        //console.log('in first:', schemaFoundAtLocalStorage);
        setError(null);
        if (schemaFoundAtLocalStorage && !jsonSchema) {
            dispatch({
                type: 'FORM_SCHEEMA_JSON',
                payload: schemaFoundAtLocalStorage,
            });
            mergeFormWithData(schemaFoundAtLocalStorage);
        } else if (schemaFoundAtLocalStorage) {
            dispatch({
                type: 'FORM_SCHEEMA_JSON',
                payload: schemaFoundAtLocalStorage,
            });
            mergeFormWithData(schemaFoundAtLocalStorage);
        } else {
            schemaFoundAtLocalStorage = fetchJsonSchemaFormServer();
            console.log('44 -> ', schemaFoundAtLocalStorage);
            mergeFormWithData(schemaFoundAtLocalStorage);
        }
        // step 1: get form data depends on formId
        // step 2: mapping get form data with jsonSchema
    }, [formId]);

    const fetchJsonSchemaFormServer = async () => {
        //dispatch({ type: 'SET_DATA_LOADING', payload: true });

        try {
            const response = await FormManagement.getForm(formId);
            localStorage.setItem(response.formId, JSON.stringify(response));
            dispatch({
                type: 'FORM_SCHEEMA_JSON',
                payload: response,
            });
            //dispatch({ type: 'SET_DATA_LOADING', payload: false });
            return response;
        } catch (_err) {
            console.log(_err);
            setError(_err.message);
            //dispatch({ type: 'SET_DATA_LOADING', payload: false });
            return null;
        }
    };

    const mergeFormWithData = async schema => {
        //console.log(schema);
        let newSchemaObject = schema;

        dispatch({ type: 'SET_DATA_LOADING', payload: true });

        setError(null);
        try {
            const getServerResponseData = await FormManagement.getFormData(
                formId
            );
            // if server has no data to corresponding formId
            if (getServerResponseData.status === 205) {
                setMergeSchema(newSchemaObject);
                dispatch({
                    type: 'FORM_SERVER_DATA',
                    payload: newSchemaObject,
                });
                dispatch({ type: 'SET_DATA_LOADING', payload: false });
                return;
            }
            dispatch({
                type: 'FORM_SERVER_DATA',
                payload: getServerResponseData,
            });

            for (let eachQuestionData of getServerResponseData.properties) {
                const { serial } = eachQuestionData;
                let jsonQuesionDetails = schema.properties[serial - 1];
                let newGridValue = jsonQuesionDetails.gridValue;

                for (let gridData of eachQuestionData.gridValue) {
                    const { value, index } = gridData;
                    newGridValue[index].value = value;
                    newGridValue[index].defaultValue = value;
                }
                newSchemaObject.properties[serial - 1].gridValue = newGridValue;
            }

            setMergeSchema(newSchemaObject);
            dispatch({
                type: 'FORM_SCHEEMA_JSON',
                payload: newSchemaObject,
            });
            dispatch({ type: 'SET_DATA_LOADING', payload: false });
            setError(null);
        } catch (_err) {
            console.log(_err);
            setError(_err.message);
            dispatch({ type: 'SET_DATA_LOADING', payload: false });
        }
    };

    if (isDataLoading || !jsonSchema) {
        console.log('loading....');
        return (
            <Text justifyContent="center" align="center">
                {'Loading......'}
            </Text>
        );
    }

    // if (error) {
    //     console.log('Error....');
    //     console.log(error);
    //     return (
    //         <Text justifyContent="center" align="center">
    //             {error}
    //         </Text>
    //     );
    // }

    if (!isDataLoading && !mergeSchema) {
        return (
            <FormContainer
                jsonSchema={jsonSchema}
                mergeFormData={() => mergeFormWithData(jsonSchema)}
            />
        );
    }

    return (
        <Box>
            {!isDataLoading && mergeSchema && (
                <FormContainer
                    jsonSchema={mergeSchema}
                    mergeFormData={() => mergeFormWithData(jsonSchema)}
                />
            )}
        </Box>
    );
};

export default SelectJSONSchema;
