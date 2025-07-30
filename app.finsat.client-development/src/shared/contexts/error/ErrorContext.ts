import React from 'react';
import { IReducerAction } from '../../models/IReducerAction';
import { ErrorType } from '../../../state/error/ErrorDefaults';

interface ErrorContextType {
    state: ErrorType;
    dispatch: React.Dispatch<IReducerAction>;
}

const ErrorContext = React.createContext<ErrorContextType>(
    {} as ErrorContextType
);

export default ErrorContext;
