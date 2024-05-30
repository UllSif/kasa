import { useState, useEffect } from "react";

export function useFetch(url) {
    const [fetchedData, setFetchData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) {
            setLoading(false);
            return;
        }

        setLoading(true);

        async function fetchData() {
            try {
                let response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                let data = await response.json();
                setFetchData(data);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [url]);

    return { fetchedData, isLoading, error };
}