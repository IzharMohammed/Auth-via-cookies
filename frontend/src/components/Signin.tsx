import axios from "axios";
import { useState } from "react"
import { BACKEND_URL } from "../config";

export default function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    return (
        <>
            <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={async () => {
                await axios.post(`${BACKEND_URL}/signin`, {
                    username,
                    password
                }, {
                    withCredentials: true,
                });
                alert('Logged in successfully!!!')
            }}>Submit</button>
        </>
    )
}