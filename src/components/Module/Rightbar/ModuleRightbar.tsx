import { useEffect, useState } from 'react';

function Rightbar() {
    const [messages, setMessages] = useState<string[]>(['Loading...']);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urls = [
                    'https://azuredemoapi-bge6hqc8baf6bae8.canadaeast-01.azurewebsites.net/api/Dashboard',
                    'https://adonisapi-age7c5ecbjf0bbff.chilecentral-01.azurewebsites.net/api/Home',
                ];

                const responses = await Promise.all(
                    urls.map((url) =>
                        fetch(url, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: 'same-origin',
                        })
                    )
                );

                const errorResponse = responses.find((res) => !res.ok);
                if (errorResponse) {
                    throw new Error(`HTTP error! status: ${errorResponse.status}`);
                }

                const data = await Promise.all(responses.map((res) => res.json()));
                const extractedMessages = data.map((item) => item.message);
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
