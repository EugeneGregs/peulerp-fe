import useAuth from "./useAuth";
import API from "../service/api";

const useRefreshToken = () => {
    const {auth, setAuth} = useAuth();

    const refresh = async () => {
        console.log("refreshing token");
        try{
            const {data} = await API.post("/users/login", {"email": auth.user.email, "password": auth.user.password});
            setAuth({...auth, token: data.token});
            return data.token;
        } catch(error){
           return Promise.reject(error);
        }
    }

    return refresh;
};

export default useRefreshToken;