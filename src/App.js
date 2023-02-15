import { Route, Routes } from 'react-router-dom';
import Page1 from './TestReactRouter/Page1';
import { useInformation } from './contexts/informationContext';
import { useEffect } from 'react';
import ProtectedRoute from './common/ProtectedRoute';
import SelectJSONSchema from './schema/container/SelectJSONSchema';

function App() {
    const { dispatch } = useInformation();

    useEffect(() => {
        var loginJsonSchema = require('./schema/form.json');
        dispatch({ type: 'FORM_SCHEEMA_JSON', payload: loginJsonSchema });

        var companyDetailsJsonSchema = require('./schema/companyDetails.json');
        dispatch({
            type: 'COMPANY_DETAILS_JSON_SCHEMA',
            payload: companyDetailsJsonSchema,
        });

        var form2JsonSchema = require('./schema/form2.json');
        dispatch({
            type: 'FORM_2_JSON_SCHEMA',
            payload: form2JsonSchema,
        });
    }, []);
    return (
        <Routes>
            <Route path="/*" element={<ProtectedRoute />}>
                <Route exact path="" element={<Page1 />} />
                <Route
                    path="company-details/:formId"
                    element={<SelectJSONSchema />}
                />
            </Route>
        </Routes>
    );
}

export default App;
