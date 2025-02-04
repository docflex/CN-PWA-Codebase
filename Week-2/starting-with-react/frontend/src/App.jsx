import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/data");
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="App">
            <h1>PWA Cache Demo with Backend</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
