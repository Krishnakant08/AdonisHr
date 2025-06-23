import { useEffect, useState } from 'react';

function Rightbar() {
    const [message, setMessage] = useState('Loading...');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://azuredemoapi-bge6hqc8baf6bae8.canadaeast-01.azurewebsites.net/api/Dashboard',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'same-origin',
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setMessage(data.message); // ✅ FIXED HERE
            } catch (error: unknown) {
                console.error('Fetch error:', error);

                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred.');
                }

                setMessage('Failed to load data');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <p>Dashboard {'>'} Module {'>'}</p>
            {error ? (
                <p style={{ color: 'red' }}>Error: {error}</p>
            ) : (
                <p>{message}</p>
            )}
        </div>
    );
}

export default Rightbar;
