import { Route, Routes } from 'react-router-dom';
import Page1 from './TestReactRouter/Page1';
import LoginContainer from './schema/container/LoginContainer';
import LoginPerviewContainer from './schema/container/LoginPerviewContainer';
import { useInformation } from './contexts/informationContext';
import { useEffect } from 'react';
import CompanyDetailsContainer from './schema/container/CompanyDetailsContainer';
import ProtectedRoute from './common/ProtectedRoute';

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
    }, []);
    return (
        <Routes>
            <Route exact path="/" element={<Page1 />} />
            <Route path="/*" element={<ProtectedRoute />}>
                <Route path="login" element={<LoginContainer />} />
                <Route
                    path="company-details"
                    element={<CompanyDetailsContainer />}
                />

                <Route
                    path="loginPreview"
                    element={<LoginPerviewContainer />}
                />
            </Route>
        </Routes>
    );
}

export default App;
