export const formatPromiseResponse = <Type>(
    promise: Promise<Type>
): Promise<{ response: Type | null; error: Error | null }> =>
    promise
        .then<{
            response: Type | null;
            error: Error | null;
        }>((response: Type) => ({ response, error: null }))
        .catch<{
            response: Type | null;
            error: Error | null;
        }>((error: Error) => ({ error, response: null }));
