import { useEffect, useState } from 'react';

function Rightbar() {
    const [message, setMessage] = useState('Loading...');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://azuredemoapi-bge6hqc8baf6bae8.canadaeast-01.azurewebsites.net/api/Dashboard',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            // Add if your API requires authentication
                            // 'Authorization': 'Bearer your-token'
                        },
                        credentials: 'same-origin' // or 'include' if using cookies
                    }
                );
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json(); // Change to .json() if API returns JSON
                setMessage(data);
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error.message);
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
