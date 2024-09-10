import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export function CheckWelcome() {
    const navigate = useNavigate();

    useEffect(() => {
        const tokenLocalStorage = localStorage.getItem('token');
        
        if (tokenLocalStorage) {
            navigate('/')
        }
    }, []);
}