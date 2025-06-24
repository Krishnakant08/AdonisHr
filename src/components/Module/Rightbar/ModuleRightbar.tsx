import { useEffect, useState } from 'react';

function Rightbar() {
    const [messages, setMessages] = useState<string[]>(['Loading...']);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiEndpoints = [
                    { 
                        path: '/dashboard/api/Dashboard',
                        name: 'Dashboard API'
                    },
                    { 
                        path: '/home/api/Home',
                        name: 'Home API'
                    }
                ];

                const responses = await Promise.all(
                    apiEndpoints.map(endpoint => 
                        fetch(`https://adonishrservers-apis.azure-api.net${endpoint.path}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                // Add if your API requires subscription key
                                // 'Ocp-Apim-Subscription-Key': 'YOUR_SUBSCRIPTION_KEY'
                            }
                        })
                        .then(async res => {
                            if (!res.ok) {
                                const errorData = await res.json().catch(() => ({}));
                                throw new Error(
                                    `${endpoint.name} failed with status ${res.status}: ${errorData.message || 'No error details'}`
                                );
                            }
                            return res.json();
                        })
                        .then(data => ({
                            name: endpoint.name,
                            message: data.message || 'No message found'
                        }))
                    )
                );

                setMessages(responses.map(r => `${r.name}: ${r.message}`));
                setError(null);
            } catch (error: unknown) {
                console.error('Fetch error:', error);
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
                setMessages(['Failed to load API data']);
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
                messages.map((msg, index) => <p key={index}>{msg}</p>)
            )}
        </div>
    );
}

export default Rightbar;
