import { useEffect, useState } from "react";
import { fetDataFromApi } from "../utils/api";


const UseFetch = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading("loading......")
        setData(null)
        setError(null)

        fetDataFromApi(url)
            .then((res) => {
                setLoading(false)
                setData(res)
            })
            .catch((err) => {
                setLoading(false)
                setError("Something went wrong!", err)
            })
    }, [url]);
    
    return {data, loading, error}
};

export default UseFetch;