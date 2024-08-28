import axios from "axios"
import { BACKEND_URL } from "../config"
import { useEffect, useState } from "react"

interface UserData {
    userId: number
}

export const User = () => {

    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/user`, {
            withCredentials: true
        }).then(res => {
            setUserData(res.data);
        })
    }, [])
    

    return (
        <>
            your id is {userData?.userId}
            <button onClick={async () => {
                await axios.post(`${BACKEND_URL}/logout`, {}, {
                    withCredentials: true,
                })
            }}>Logout</button>
        </>
    )
}