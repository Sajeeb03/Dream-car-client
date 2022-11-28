import axios from "axios";
import { useEffect, useState } from "react"

const useBuyer = (email) => {
    const [isBuyer, setIsBuyer] = useState(false);
    const [buyerLoading, setBuyerLoading] = useState(true);

    useEffect(() => {
        if (email) {
            axios(`https://dream-car-server-sajeeb03.vercel.app/users/buyer/${email}`)
                .then(res => {
                    setIsBuyer(res.data.isBuyer)
                    setBuyerLoading(false)
                })
        }
    }, [email, buyerLoading])
    return [isBuyer, buyerLoading];
}

export default useBuyer;