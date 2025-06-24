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
                                // Uncomment this line if subscription key is required
                                // 'Ocp-Apim-Subscription-Key': '<your-subscription-key>',
                            },
                        })
                    )
                );

                const errorResponse = responses.find((res) => !res.ok);
                if (errorResponse) {
                    throw new Error(`HTTP error! status: ${errorResponse.status}`);
                }

                const data = await Promise.all(responses.map((res) => res.json()));
                const extractedMessages = data.map((item) => item?.message ?? 'No message');
                setMessages(extractedMessages);
            } catch (error: unknown) {
                console.error('Fetch error:', error);

                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred.');
                }

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
                messages.map((msg, index) => <p key={index}>{msg}</p>)
            )}
        </div>
    );
}

export default Rightbar;
