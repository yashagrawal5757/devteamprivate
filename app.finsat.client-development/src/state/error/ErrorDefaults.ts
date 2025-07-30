export type ErrorType = {
    isError: boolean;
    message: string;
};

const Error: ErrorType = { isError: false, message: '' };

export default Error;
