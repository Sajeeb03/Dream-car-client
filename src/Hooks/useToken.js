import { useEffect, useState } from "react"

const useToken = email => {
    const [token, setToken] = useState();
    useEffect(() => {
        if (email) {
            fetch(`https://dream-car-server-sajeeb03.vercel.app/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem("accessToken", data.data)
                    setToken(data.data)
                })
        }

    }, [email])
    return [token]
}

export default useToken;