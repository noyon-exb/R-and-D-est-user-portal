import React from 'react';

const InformationContext = React.createContext();

function informationReducer(state, action) {
    switch (action.type) {
        case 'CLEAR_INFORMATION': {
            localStorage.removeItem('information');
            return { ...initialState };
        }
        default: {
            throw new Error(`Unsupported action type: ${action.type}`);
        }
    }
}

const initialState = {};

const localState = JSON.parse(localStorage.getItem('information'));

function InformationProvider(props) {
    const [state, dispatch] = React.useReducer(
        informationReducer,
        localState || initialState
    );

    React.useEffect(() => {
        localStorage.setItem('information', JSON.stringify(state));
    }, [state]);
    const value = React.useMemo(() => [state, dispatch], [state]);
    return <InformationContext.Provider value={value} {...props} />;
}

function useInformation() {
    const context = React.useContext(InformationContext);
    if (!context) {
        throw new Error(
            'useInformation must be used within a InformationProvider'
        );
    }
    const [state, dispatch] = context;

    return { state, dispatch };
}

export { InformationProvider, useInformation };
