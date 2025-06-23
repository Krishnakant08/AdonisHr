import { useEffect, useState } from 'react';

function Rightbar() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('https://localhost:7092/api/Dashboard')
            .then(response => response.text())
            .then(data => setMessage(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            <p>Dashboard {'>'} Module {'>'}</p>
            <p>hello {message}</p>
        </div>
    );
}

export default Rightbar;
