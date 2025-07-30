import React, { ReactNode, Context as ReactContext } from 'react';
import ReducerType from '../types/ReducerType';

interface ProviderProps {
    children: ReactNode;
}

const createDataContext = <State, Action>(
    reducer: ReducerType<State, Action>,
    defaultValue: State,
    Context: ReactContext<{ state: State; dispatch: React.Dispatch<Action> }>
) => {
    const Provider = ({ children }: ProviderProps) => {
        const [state, dispatch] = React.useReducer(reducer, defaultValue);

        return (
            <Context.Provider value={{ state, dispatch }}>
                {children}
            </Context.Provider>
        );
    };

    return Provider;
};

export default createDataContext;
