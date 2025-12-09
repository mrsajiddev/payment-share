"use client";

import { useState, FormEvent } from "react";
import { RegisterPayload } from "../../classes/registerPayload";
import Notice from "../components/notice/notice";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/app/utils/api";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{type: 'success' | 'error'; message: string } | null >(null)

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const target = e.currentTarget as HTMLFormElement;
    const formData = new window.FormData(target);

    const payload: RegisterPayload = {
      fullName: formData.get("full_name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      username: (formData.get("email") as string).split("@")[0],
      mobileNumber: "", // mobile number is optional, user can fill it in the profile section
      accountVerified: "no",
    };

    try {

      const res = await apiRequest({
        apiEndPoint: "/users/create", 
        method: "POST", 
        body: payload
      });

      console.log(">>>> Response: ", res);
      // If response is array or object table compatible:
      console.table(res.data);

      // const res = await fetch("http://localhost:3001/users/create", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });

      // if (!res.ok) throw new Error("Failed to create account");

      setNotice({ type: "success", message: "Account created successfully!" });
      target.reset();
      router.push(`/auth/otp?email=${payload.email}`);

    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        setNotice({ type: "error", message: err.message });
      } else {
        console.error(err);
        setNotice({ type: "error", message: "Unknown error creating account" });
      }
    } finally {
      setLoading(false);
    }
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
        <h2 className="mt-10 text-center text-2xl font-bold text-white">
          Create your account
        </h2>
        {notice && <Notice type={notice.type} message={notice.message} /> }
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label
              htmlFor="full_name"
              className="block text-sm font-medium text-gray-100"
            >
              Full name
            </label>
            <div className="mt-2">
              <input
                id="full_name"
                name="full_name"
                type="text"
                required
                autoComplete="name"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-100"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-100"
              >
                Password
              </label>
              <div className="text-sm">
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Creating..." : "Sign up"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
