import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { InformationProvider } from './contexts/informationContext';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ChakraProvider theme={theme}>
            <InformationProvider>
                <App />
            </InformationProvider>
        </ChakraProvider>
    </BrowserRouter>
);
