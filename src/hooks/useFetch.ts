import { useState, useEffect } from 'react'

interface UseFetchArgs {
    url: string
    options: RequestInit
}

export default function useFetch<T>({ url, options }: UseFetchArgs) {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!url) return

        const fetchData = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await fetch(url, options)
                if (!response.ok) {
                    throw new Error(`HTTP 오류, 오류코드: ${response.status}`)
                }
                const result: T = await response.json()
                setData(result)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [url, options])

    return { data, loading, error }
}