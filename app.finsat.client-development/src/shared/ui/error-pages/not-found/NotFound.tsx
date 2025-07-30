import { useRouteError } from 'react-router-dom';

const NotFound = () => {
    const error = useRouteError() as unknown as RouteError;
    console.log('error: ', error);

    return (
        <div className="bg-white flex items-center justify-center w-full md:w-5/11 h-1/2 md:h-screen p-8 md:p-12">
            <div className="w-full max-w-md px-4 md:px-8">
                <p
                    className="font-bold mb-6 text-center"
                    style={{ fontSize: '8rem', color: '#0d1b37' }}
                >
                    404
                </p>
                <p className="mb-6 text-center" style={{ fontSize: '1.3rem' }}>
                    Sorry, we couldn't find that page.
                </p>
                <p className="mb-6 text-center" style={{ fontSize: '1.3rem' }}>
                    The page you are looking for might have been removed, had
                    its name changed, or is temporarily unavailable.
                </p>
            </div>
        </div>
    );
};

type RouteError = {
    statusText: string | undefined;
    message: string | undefined;
};

export default NotFound;
