import axios from 'axios';
import { useContext, createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

function AuthContextProvider ({children}) {

    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    const [dataIsReady, setDataIsReady] = useState(false)
    const [user,setUser] = useState(null);
    const [error,setError] = useState(null);

    useEffect(()=>{


            const authUser = async ()=>{
                if(cookies.token) {

                try {
                    const {data} = await axios.get("http://localhost:4000/users/auth", {
                        headers: {
                            Authorization : `Bearer ${cookies.token}`
                        }
                    });
    
                    setUser(data.user);
                    setDataIsReady(true);
    
                    
                } catch (error) {
                    removeCookie("token");
                    setError(error.response.data.error)
                    setDataIsReady(true)
                }
            }
            setDataIsReady(true);
            };
    
            authUser();
        
    },[])

    if (error) {
        return console.log(error)
    }

    else if(dataIsReady) {
        return (
            <AuthContext.Provider value={{user, setUser}}>
                {children}
            </AuthContext.Provider>
        )
    }
    }

export const useAuth = ()=>{
    return useContext(AuthContext);
}


export default AuthContextProvider
