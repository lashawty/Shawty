import {useRouter} from 'next/navigation';

type Path = `/${string}`

type Url = {
    auth?: Path,
    notAuth?: Path, 
}

export const useAuthRedirect = (url: Url = {}, isAuth: boolean) => {
    const router = useRouter();
    
    if(!isAuth && url.notAuth) {
        router.push(url.notAuth);
    }

    if(isAuth && url.auth) {
        router.push(url.auth);
    }
}   