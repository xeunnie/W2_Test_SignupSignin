"use client";

import Link from "next/link";
import SignupForm from "@/app/signup/components/SignupForm";

export default function SignupPage() {
    return (
        <div className="m-0 p-8 w-[480px] flex flex-col items-stretch justify-center rounded-[5px] bg-[#313338] [box-shadow:0px] text-#B5BAC1">
            <h1 className="text-[#F2F3F5] text-[24px]">계정 만들기</h1>
            <SignupForm />
            <div>
                <div className="mt-2 text-[#949BA4] text-xs text-left">
                    등록하는 순간 Discord의{" "}
                    <span className="text-[#00AAFC]">서비스 이용 약관</span>과
                    <span className="text-[#00AAFC]"> 개인정보 보호 정책</span>에 동의하게 됩니다.
                </div>
                <Link href="/signin">
                    <div className="mt-[18px] text-[#00AAFC] text-[14px] text-left">
                        이미 계정이 있으신가요?
                    </div>
                </Link>
            </div>
        </div>
    );
}