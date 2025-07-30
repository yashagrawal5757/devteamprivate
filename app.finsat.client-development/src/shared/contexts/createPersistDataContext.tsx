import React, { ReactNode, Context as ReactContext, useEffect } from 'react';
import ReducerType from '../types/ReducerType';

interface ProviderProps {
    children: ReactNode;
}

const createPersistDataContext = <State, Action>(
    reducer: ReducerType<State, Action>,
    defaultValue: State,
    Context: ReactContext<{ state: State; dispatch: React.Dispatch<Action> }>,
    storageSyncCallback: () => any
) => {
    const Provider = ({ children }: ProviderProps) => {
        const [state, dispatch] = React.useReducer(
            reducer,
            defaultValue,
            storageSyncCallback
        );

        return (
            <Context.Provider value={{ state, dispatch }}>
                {children}
            </Context.Provider>
        );
    };

    return Provider;
};

export default createPersistDataContext;
