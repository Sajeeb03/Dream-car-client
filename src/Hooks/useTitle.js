import { useEffect } from "react"

const useTitle = (title1, title2) => {
    useEffect(() => {
        document.title = `${title1}/${title2}`
    }, [title1, title2])
}

export default useTitle;