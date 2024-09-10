import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export function CheckLogin() {
    const navigate = useNavigate();

    useEffect(() => {
        const tokenLocalStorage = localStorage.getItem('token');
        
        if (!tokenLocalStorage) {
            navigate('/login')
        }
    }, []);
}