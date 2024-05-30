import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

type Path = `/${string}`

type Url = {
    auth?: Path,
    notAuth?: Path, 
}

export const useAuthRedirect = (url: Url = {}, isAuth: boolean) => {
    const router = useRouter();

    useEffect(() => {
        if(!isAuth && url.notAuth) {
            router.push(url.notAuth);
        }
    
        if(isAuth && url.auth) {
            router.push(url.auth);
        }
    }, [isAuth])
}   