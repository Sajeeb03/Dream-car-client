import axios from "axios";
import { useEffect, useState } from "react"

const useSeller = email => {
    const [isSeller, setIsSeller] = useState(false);
    const [sellerLoading, setSellerLoading] = useState(true);

    useEffect(() => {
        if (email) {
            axios(`http://localhost:5000/users/seller/${email}`)
                .then(res => {
                    setIsSeller(res.data.isSeller);
                    setSellerLoading(false)
                });

        }
    }, [email, sellerLoading])
    return [isSeller, sellerLoading];
}

export default useSeller;