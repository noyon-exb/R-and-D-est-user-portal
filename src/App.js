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
        localStorage.setItem(
            loginJsonSchema.formId,
            JSON.stringify(loginJsonSchema)
        );

        var companyDetailsJsonSchema = require('./schema/companyDetails.json');
        localStorage.setItem(
            companyDetailsJsonSchema.formId,
            JSON.stringify(companyDetailsJsonSchema)
        );

        var form2JsonSchema = require('./schema/form2.json');
        localStorage.setItem(
            form2JsonSchema.formId,
            JSON.stringify(form2JsonSchema)
        );

        dispatch({
            type: 'FORM_SCHEEMA_JSON',
            payload: companyDetailsJsonSchema,
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
