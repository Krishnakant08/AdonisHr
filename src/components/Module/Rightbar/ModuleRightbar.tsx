import { useEffect, useState } from 'react';

function Rightbar() {
    const [apiData, setApiData] = useState<{name: string, message: string}[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchApiData = async () => {
            try {
                const endpoints = [
                    { name: 'Dashboard', url: '/dashboard/api/Dashboard' },
                    { name: 'Home', url: '/home/api/Home' }
                ];

                const results = await Promise.all(
                    endpoints.map(async (endpoint) => {
                        try {
                            const response = await fetch(
                                `https://adonishrservers-apis.azure-api.net${endpoint.url}`,
                                {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        // Add if needed:
                                        // 'Ocp-Apim-Subscription-Key': 'your-key'
                                    }
                                }
                            );

                            if (!response.ok) {
                                throw new Error(`${endpoint.name} API returned ${response.status}`);
                            }

                            const data = await response.json();
                            return {
                                name: endpoint.name,
                                message: data.message || 'No message'
                            };
                        } catch (err) {
                            return {
                                name: endpoint.name,
                                message: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`
                            };
                        }
                    })
                );

                setApiData(results);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchApiData();
    }, []);

    return (
        <div>
            <p>Dashboard {'>'} Module {'>'}</p>
            
            {loading && <p>Loading API data...</p>}
            
            {error && (
                <div style={{ color: 'red' }}>
                    <p>Error: {error}</p>
                    <p>Please check:</p>
                    <ul>
                        <li>API Management policy configuration</li>
                        <li>Backend service availability</li>
                        <li>Network connectivity</li>
                    </ul>
                </div>
            )}

            {!loading && apiData.map((item, index) => (
                <div key={index}>
                    <h4>{item.name} API:</h4>
                    <p>{item.message}</p>
                </div>
            ))}
        </div>
    );
}

export default Rightbar;
