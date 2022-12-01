import { Route, Routes } from 'react-router-dom';
import Page1 from './TestReactRouter/Page1';
import Page2 from './TestReactRouter/Page2';

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<Page1 />} />
            <Route exact path="/page1" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
        </Routes>
    );
}

export default App;
