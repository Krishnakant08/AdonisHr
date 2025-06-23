import { useEffect, useState } from 'react';

function Rightbar() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('https://azuredemoapi-bge6hqc8baf6bae8.canadaeast-01.azurewebsites.net/api/Dashboard')
            .then(response => response.text())
            .then(data => setMessage(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            <p>Dashboard {'>'} Module {'>'}</p>
            <p>{message}</p>
        </div>
    );
}

export default Rightbar;
