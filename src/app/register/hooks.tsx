import {useContext, useState} from 'react';
import {ControllerRenderProps, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {auth, crud} from '@/lib/firebase';
import {errorCodeConfig, ErrorCodeEnum} from '@/lib/firebase/config';
import {AlertContext} from '@/components/provider';
import {useRouter} from 'next/navigation';

export type TName = "displayName" | "city" | "zip" | "address" | "phoneNumber" | "email" | "password"

export type TFormField = ControllerRenderProps<z.infer<any>, TName>;

const formSchema = z.object({
    displayName: z.string().min(2, {
        message: '店家名字至少需要兩個字吧！',
    }),
    email: z.string().email("請輸入 Email"),
    password: z.string().min(1, {
        message: "忘記打密碼了啦！",
    }),
    city: z.string().min(3, {
        message: "請輸入城市",
    }),
    zip: z.string().min(3, {
        message: "請輸入區域",
    }),
    address: z.string().min(1, {
        message: "請輸入地址",
    }),
    phoneNumber: z.string().min(10, {
        message: "請輸入電話",
    }),
})

export const useRegisterForm = () => {
    const {handleUpdateMessage} = useContext(AlertContext);
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            displayName: "",
            email: "",
            password: "",
            city: "TXG",
            zip: "406",
            address: ""
        },
    })
    const isDisabled = !form.formState.isValid || isPending;

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsPending(true);
        const {email, password,displayName, zip, address, city, phoneNumber} = values
        const createUserPromise = auth.createUser(email, password);
        createUserPromise.then((userCredential) => {
            auth.updateDisplayName(displayName)
                .then(() => {
                    crud.addUserData({
                        displayName,
                        city,
                        zip,
                        address,
                        phoneNumber,
                    }, userCredential.user.uid);
                })
                .catch((error) => {
                    handleUpdateMessage({
                        title: error.code,
                        desc: error.message,
                    })
                })
            handleUpdateMessage({
                title: "註冊成功",
                desc: `${userCredential.user.email} 已註冊成功！`,
            })
        })
            .catch((error) => {
                handleUpdateMessage({
                    title: "註冊失敗",
                    desc: errorCodeConfig[error.code as ErrorCodeEnum] ?? error.code,
                })
            })
            .finally(() => {
                router.push('/login')
                setIsPending(false);
            })
    }


    return {
        form,
        onSubmit,
        isDisabled,
    }
}