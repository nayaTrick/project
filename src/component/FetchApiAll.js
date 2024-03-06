import { useState, useEffect } from 'react'
import allData from '../data/allData'

export default function FetchApiAll() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        try {
            setData(allData)
            setLoading(false)
        }
        catch{
            setError('error retrieving data');
            setLoading(false);
        }
    }, [])
    return { loading, data, error }
}
