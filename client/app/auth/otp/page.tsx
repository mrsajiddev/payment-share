"use client";
import { useEffect, useRef, useState } from "react";
import Notice from "../components/notice/notice";
import { NoticeProps } from "@/app/classes/noticeProps";
import { useSearchParams } from "next/navigation";

export default function OtpVerificationPage() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const OTP_LENGTH = 6;

    const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const [timeLeft, setTimeLeft] = useState(120);
    const [isTimerActive, setIsTimerActive] = useState(true);
    const userEmail = email; 
    const [notice, setNotice] = useState<NoticeProps | null>(null);

    // Timer effect
    useEffect(() => {
    if (!isTimerActive) return;

    const timer = setInterval(() => {
        setTimeLeft((prev) => {
        if (prev <= 1) {
            clearInterval(timer);
            setIsTimerActive(false);
            return 0;
        }
        return prev - 1;
        });
    }, 1000);

    return () => clearInterval(timer);
    }, [isTimerActive]);

    // Input handlers
    const handleDigitChange = (value: string, index: number) => {
    if (value.length > 1) value = value.slice(0, 1);

    const updatedOtp = [...otpDigits];
    updatedOtp[index] = value;
    setOtpDigits(updatedOtp);

    if (value && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
    }
    };

    const handleDigitKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "e") e.preventDefault();
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text").trim().slice(0, OTP_LENGTH);
    const updatedOtp = [...otpDigits];

    for (let i = 0; i < OTP_LENGTH; i++) {
        updatedOtp[i] = pastedData[i] || "";
    }

    setOtpDigits(updatedOtp);
    inputRefs.current[0]?.focus();
    };

    // Verify OTP
    const verifyOtp = () => {
    const otpCode = otpDigits.join("");
    if (otpCode.length !== OTP_LENGTH) return setNotice({type: "error", message: "Enter full OTP."});
    if (timeLeft <= 0) return setNotice({type: "warning", message: "OTP expired. Please resend."});

    // alert("Verifying OTP: " + otpCode);
    setNotice({type: "success", message: "Verifying OTP: " + otpCode });
    };

    // Resend OTP
    const resendOtp = () => {
    if (timeLeft > 0) return; // disabled until timer expires

    // alert("OTP resent!");
    setNotice({type: "success", message: "OTP resent"});
    setOtpDigits(Array(OTP_LENGTH).fill(""));
    inputRefs.current[0]?.focus();
    setTimeLeft(120);
    setIsTimerActive(true);
    };

    // Format timer
    const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = String(timeLeft % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
    };

    return (
    <div className="h-screen flex items-center justify-center bg-[#121212] text-white
        bg-[radial-gradient(circle_at_25%_25%,rgba(166,86,246,.1)_2%,transparent_0%),radial-gradient(circle_at_75%_75%,rgba(102,101,241,.1)_2%,transparent_0%)]">

        <div className="max-w-md w-full p-10 rounded-2xl bg-black/40 backdrop-blur-lg border border-white/10 shadow-xl text-center">
        {notice && <Notice type={notice.type} message={notice.message} />  }
        <h1 className="text-3xl font-semibold">OTP Verification</h1>
        <p className="text-gray-300 mt-3">
            Enter the OTP sent to <span className="text-purple-400 font-medium">{userEmail}</span>
        </p>

        <div className="flex justify-center gap-3 mt-8 mb-6">
            {otpDigits.map((digit, index) => (
            <input
                key={index}
                ref={(el) => { if (el && !inputRefs.current[index]) inputRefs.current[index] = el; }}
                type="number"
                min={0}
                max={9}
                value={digit}
                onChange={(e) => handleDigitChange(e.target.value, index)}
                onKeyDown={(e) => handleDigitKeyDown(e, index)}
                onPaste={handlePaste}
                onWheel={(e) => e.currentTarget.blur()}
                className="w-12 h-14 text-center text-xl font-semibold bg-white/10 border border-purple-500 rounded-xl outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
            />
            ))}
        </div>

        <button
            onClick={verifyOtp}
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer disabled:opacity-50"
        >
            Verify OTP
        </button>

        <div className="mt-4 text-sm text-gray-300">
            Didn’t receive the code?
            <span
            onClick={resendOtp}
            className={`ml-1 cursor-pointer font-medium ${
                timeLeft === 0 ? "text-indigo-400 hover:underline" : "opacity-40 cursor-not-allowed"
            }`}
            >
            Resend
            </span>
            <span className="ml-2 text-purple-400 font-medium">
            {timeLeft > 0 ? `(${formatTime()})` : "Expired"}
            </span>
        </div>
        </div>
    </div>
    );
}
