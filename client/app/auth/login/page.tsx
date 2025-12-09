"use client";

import { useAuth } from "@/app/utils/use-auth"
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Notice from "../components/notice/notice";
import { NoticeProps } from "@/app/classes/noticeProps";
import { apiRequest } from "@/app/utils/api";
import { setUserCookie } from "@/app/utils/setUserCookie";

export default function Login() {
    const auth = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [notice, setNotice] = useState<NoticeProps | null >( null );

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };


    if( auth && auth.user !== null ) {
        router.push("/dashboard");
    }

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const target = e.currentTarget as HTMLFormElement;
        const formData = new FormData(target);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        // basic validation
        if (!email || !password) {
            setLoading(false);
            return setNotice({ type: "error", message: "Email & Password are required" });
        }
        if (!validateEmail(email)) {
            setLoading(false);
            return setNotice({ type: "error", message: "Invalid email format" });
        }
        if (password.length < 8) {
            setLoading(false);
            return setNotice({ type: "error", message: "Minimum 8 characters password" });
        }

        try {
            const resp = await apiRequest({
                apiEndPoint: "/auth/login",
                method: "POST",
                body: { email, password }
            });

            let noticeData;

            if (resp.success) {
                noticeData = { type: "success", message: resp.message };
                const cookiePayload = {
                    token: resp.data.token,
                    user: resp.data.user,
                }

                const setCookie = await setUserCookie(cookiePayload);

                target.reset();

                // redirect to dashboard
                setTimeout(() => {
                    router.push("/dashboard");
                }, 500);

            } else {
                noticeData = { type: "error", message: resp.message };
            }

            setNotice(noticeData);
            
        } catch (err: any) {
            setNotice({ type: "error", message: err?.message || "Unknown error" });
        }

        setLoading(false);
    };


    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <a href="/" className="logo">
                <img
                    alt="Payment Share"
                    src="https://www.citypng.com/public/uploads/preview/hd-black-hand-to-hand-money-cash-payment-icon-transparent-png-701751694974663tfjsmuftvt.png"
                    className="mx-auto h-10 w-auto"
                />
            </a>
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
           {notice && <Notice type={notice.type} message={notice.message}></Notice> } 
            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                    Email address
                </label>
                <div className="mt-2">
                    <input
                    id="email"
                    name="email"
                    type="text"
                    
                    autoComplete="email"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                </div>
                </div>

                <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                    Password
                    </label>
                    <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                        Forgot password?
                    </a>
                    </div>
                </div>
                <div className="mt-2">
                    <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                </div>
                </div>

                <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer"
                >
                    {loading === true ? "Loading..." : "Sign in"} 
                </button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-400">
                Not a member?{' '}
                <a href="/auth/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
                Sign up
                </a>
            </p>
            </div>
        </div>
    )
}