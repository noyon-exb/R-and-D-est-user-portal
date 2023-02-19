import React from 'react';
import {
    CLEAR_INFORMATION,
    UNSUPPORTED_ACTION_TYPE,
} from '../constants/actionTypeConstant';
import { INFORMATION } from '../constants/basicConstants';

const InformationContext = React.createContext();

function informationReducer(state, action) {
    switch (action.type) {
        case 'FORM_SCHEEMA_JSON': {
            return { ...state, jsonSchema: action.payload };
        }
        case 'FORM_SERVER_DATA': {
            return { ...state, serverData: action.payload };
        }
        case CLEAR_INFORMATION: {
            localStorage.removeItem(INFORMATION);
            return { ...initialState };
        }
        default: {
            throw new Error(`${UNSUPPORTED_ACTION_TYPE} ${action.type}`);
        }
    }
}

const initialState = {
    jsonSchema: null,
    serverData: null,
};

const localState = JSON.parse(localStorage.getItem(INFORMATION));

function InformationProvider(props) {
    const [state, dispatch] = React.useReducer(
        informationReducer,
        localState || initialState
    );

    React.useEffect(() => {
        localStorage.setItem(INFORMATION, JSON.stringify(state));
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
