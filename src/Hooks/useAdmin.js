import { useEffect, useState } from "react"

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`https://dream-car-server-sajeeb03.vercel.app/users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsAdmin(data.isAdmin);
                    setAdminLoading(false)
                })
                .catch(err => console.error(err))
        }
    }, [email, adminLoading])
    return [isAdmin, adminLoading]
}

export default useAdmin;