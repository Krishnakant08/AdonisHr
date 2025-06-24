import { useEffect, useState } from 'react';

function Rightbar() {
    const [messages, setMessages] = useState<string[]>(['Loading...']);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urls = [
                    'https://adonishrservers-apis.azure-api.net/dashboard/api/Dashboard',
                    'https://adonishrservers-apis.azure-api.net/home/api/Home',
                ];

                const responses = await Promise.all(
                    urls.map((url) =>
                        fetch(url, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                // Add if your API requires subscription key
                                // 'Ocp-Apim-Subscription-Key': 'YOUR_SUBSCRIPTION_KEY'
                            },
                            // Only include credentials if you need to send cookies
                            // credentials: 'include'
                        })
                    )
                );

                const errorResponse = responses.find((res) => !res.ok);
                if (errorResponse) {
                    throw new Error(`API request failed with status ${errorResponse.status}`);
                }

                const data = await Promise.all(responses.map((res) => res.json()));
                const extractedMessages = data.map((item) => item.message || 'No message found');
                setMessages(extractedMessages);
            } catch (error: unknown) {
                console.error('Fetch error:', error);
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
                setMessages(['Failed to load data']);
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
                messages.map((msg, index) => (
                    <p key={index}>
                        {index === 0 ? 'Dashboard API: ' : 'Home API: '}
                        {msg}
                    </p>
                ))
            )}
        </div>
    );
}

export default Rightbar;
