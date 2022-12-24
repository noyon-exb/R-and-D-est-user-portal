import { Route, Routes } from 'react-router-dom';
import Page1 from './TestReactRouter/Page1';
import Page2 from './TestReactRouter/Page2';
import ProtectedRoute from './common/ProtectedRoute';

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<Page1 />} />
            <Route exact path="/page1" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
            <Route
                path="/demo1"
                element={
                    <ProtectedRoute>
                        <Page1 />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/demo2"
                element={
                    <ProtectedRoute>
                        <Page1 />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user-management"
                element={
                    <ProtectedRoute>
                        <Page1 />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
