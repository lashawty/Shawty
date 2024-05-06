import {useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {auth} from '@/lib/firebase';
import {errorCodeConfig, ErrorCodeEnum} from '@/lib/firebase/config';
import {AlertContext, AuthContext} from '@/components/provider';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    email: z.string().email("請輸入 Email"),
    password: z.string().min(1, {
        message: "忘記打密碼了啦！",
    }),
})

export const useLoginForm = () => {
    const router = useRouter();
    const {handleUpdateMessage} = useContext(AlertContext);
    const {handleUpdateAuthInfo} = useContext(AuthContext);
    const [isPending, setIsPending] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const isDisabled = !form.formState.isValid || isPending;
    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsPending(true);
        const signInPromise = auth.signIn(values.email, values.password);
        signInPromise
            .then((userCredential) => {
                const {photoURL, uid, displayName, email, phoneNumber} = userCredential.user;
                handleUpdateAuthInfo({
                    photoUrl: photoURL,
                    displayName,
                    uid,
                    email,
                    phoneNumber,
                })
                localStorage.setItem("isAuth", "true")
                handleUpdateMessage({
                    title: "登入成功",
                    desc: "你已登入成功！",
                })
                router.push('/dashboard');
            })
            .catch((error) => {
                handleUpdateMessage({
                    title: "登入失敗",
                    desc: errorCodeConfig[error.code as ErrorCodeEnum] ?? error.code,
                })
            })
            .finally(() => {
                setIsPending(false);
            })
    }

    const handleForgetPassword = () => {
        handleUpdateMessage({
            title: "忘記密碼",
            desc: "請聯絡 Sean 重設密碼，因為沒錢傳簡訊給你驗證",
            continueButton: "Okay",
        })
    }

    return {
        form,
        onSubmit,
        isDisabled,
        handleForgetPassword
    }
}