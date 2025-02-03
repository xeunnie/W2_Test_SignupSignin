import React, { useState } from "react";
import { signUp } from "@/api/authService";
import {
    isEmptyString,
    isLengthBetween,
    isEmail,
    isPassword,
    isNickname,
    isName,
} from "@/utils/stringValidations";
import useForm from "@/hooks/useForm";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import LoginLabel from "@/components/LoginLabel";
import LoginTextInput from "@/components/LoginTextInput";
import DatePicker from "@/app/signup/components/Datepicker";
import type { FieldInfos, FieldValue } from "@/types/LoginTypes";

const fieldInfos: FieldInfos = {
    email: {
        initialValue: "",
        isRequired: true,
        validation: (newValue: FieldValue) => {
            if (typeof newValue !== "string") return "비정상적인 입력입니다";
            if (isEmptyString(newValue)) return "이메일을 입력해주세요";
            if (!isEmail(newValue)) return "이메일 형식이 아닙니다";
            if (!isLengthBetween(newValue, 6, 50))
                return "이메일은 6자 이상 50자 이하여야 합니다";
            return "";
        },
    },
    nickname: {
        initialValue: "",
        isRequired: false,
        validation: (newValue: FieldValue) => {
            if (typeof newValue !== "string") return "비정상적인 입력입니다";
            if (isEmptyString(newValue)) return "닉네임을 입력해주세요";
            if (!isNickname(newValue)) return "닉네임 형식이 아닙니다";
            if (!isLengthBetween(newValue, /[가-힣]/.test(newValue) ? 2 : 4, 10))
                return "닉네임은 2자 이상 10자 이하여야 합니다";
            return "";
        },
    },
    name: {
        initialValue: "",
        isRequired: true,
        validation: (newValue: FieldValue) => {
            if (typeof newValue !== "string") return "비정상적인 입력입니다";
            if (isEmptyString(newValue)) return "이름을 입력해주세요";
            if (!isName(newValue)) return "이름 형식이 아닙니다";
            if (!isLengthBetween(newValue, 2, 20))
                return "이름은 2자 이상 20자 이하여야 합니다";
            return "";
        },
    },
    password: {
        initialValue: "",
        isRequired: true,
        validation: (newValue: FieldValue) => {
            if (typeof newValue !== "string") return "비정상적인 입력입니다";
            if (isEmptyString(newValue)) return "비밀번호를 입력해주세요";
            if (!isPassword(newValue)) return "비밀번호 형식이 아닙니다";
            if (!isLengthBetween(newValue, 6, 22))
                return "비밀번호는 6자 이상 22자 이하여야 합니다";
            return "";
        },
    },
};

export default function SignupForm() {

    const [loading, setLoading] = useState(false);const { values, errors, isRequired, changeFieldValue } = useForm(
        fieldInfos,
        (formValues) => {
            console.log(formValues);
        }
    );
    const [errorMessage, setErrorMessage] = useState("");

    const [birthdate, setBirthdate] = useState<{ year: number | ""; month: number | ""; day: number | "" }>({
        year: "",
        month: "",
        day: "",
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage("");
        console.log("버튼 비활성화 (loading = true)");

        try {
            const birthdateValue = `${birthdate.year || "0000"}-${birthdate.month || "00"}-${birthdate.day || "00"}`;

            const userData = {
                email: values.email as string,
                password: values.password as string,
                nickname: values.nickname as string,
                name: values.name as string,
                birthdate: birthdateValue,
            };
            console.log("회원가입 요청 데이터:", userData);
            await signUp(userData);
            // alert("회원가입 성공! 로그인 해주세요.");
            console.log("회원가입 성공!");
            setTimeout(() => {
                alert("회원가입 성공! 로그인 해주세요.");
            }, 0);
        } catch (error: any) {
            console.error("회원가입 실패:", error);
            setErrorMessage(error.response?.data?.message || "회원가입에 실패했습니다.");
        } finally {
            setLoading(false);
            console.log("버튼 활성화 (loading = false)");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <LoginTextInput
                name="email"
                type="email"
                title="email"
                value={values.email as string}
                onChange={(e) => changeFieldValue(e.target.value, "email")}
                error={errors.email}
                isRequired={isRequired.email}
            />
            <LoginTextInput
                name="username"
                type="text"
                title="username"
                value={values.name as string}
                onChange={(e) => changeFieldValue(e.target.value, "name")}
                error={errors.name}
                isRequired={isRequired.name}
            />
            <LoginTextInput
                name="nickname"
                type="text"
                title="nickname"
                value={values.nickname as string}
                onChange={(e) => changeFieldValue(e.target.value, "nickname")}
                error={errors.nickname}
                isRequired={isRequired.nickname}
            />
            <LoginTextInput
                name="password"
                type="password"
                title="password"
                value={values.password as string}
                onChange={(e) => changeFieldValue(e.target.value, "password")}
                error={errors.password}
                isRequired={isRequired.password}
            />
            {/*<LoginLabel title="생년월일">*/}
            {/*    <DatePicker   onChange={setBirthdate}/>*/}
            {/*</LoginLabel>*/}
            <label className="mt-3 flex items-center">
                <Checkbox
                    style={`flex w-6 h-6 p-[3px] rounded-[6px] border-[1px] bg-transparent border-gray-400 hover:outline-none`}
                />
                <input type="hidden" name="isAgreed" value="false" />
                <div className="w-[364px] pl-2 text-[#949BA4] text-sm text-left">
                    (선택사항) Discord 소식, 도움말, 특별 할인을 이메일로 보내주세요.
                    언제든지 취소하실 수 있어요.
                </div>
            </label>
            {errorMessage && <p className="text-red-500 mt-3">{errorMessage}</p>}
            <Button
                type="submit"
                disabled={loading}
                style={`mt-5 p-[10px] w-full h-11 justify-center items-center rounded-[3px] bg-indigo-500`}>
                {loading ? "가입 중..." : "계속하기"}
            </Button>
        </form>
    );
}