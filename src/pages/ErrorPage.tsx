import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

const ErrorPage = () => {
    const location = useLocation()
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="text-center bg-white p-8 rounded-lg shadow-xl w-11/12 max-w-lg">
                <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
                <h1 className="text-6xl font-bold text-red-500 mb-4">{location.pathname}</h1>
                <p className="text-xl text-gray-800 mb-2">Wrong URL</p>
                <p className="text-gray-600 mb-6">We couldn't find the page you're looking for. Please check the URL or try again later.</p>
                <Button
                    className="px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg focus:outline-none"
                    onClick={() => window.location.reload()}>
                    Refresh Page
                </Button>
            </div>
        </div>
    );
};

export default ErrorPage;
