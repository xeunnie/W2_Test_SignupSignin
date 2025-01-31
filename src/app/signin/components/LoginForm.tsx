import { useState } from "react";
import { signIn } from "@/api/authService";
import { FieldInfos, FieldValue } from "@/types/LoginTypes";
import { isEmptyString } from "@/utils/stringValidations";
import useForm from "@/hooks/useForm";
import LoginTextInput from "@/components/LoginTextInput";

const fieldInfos: FieldInfos = {
    email: {
        initialValue: "",
        isRequired: true,
        validation: (newValue: FieldValue) => {
            if (typeof newValue !== "string") return "비정상적인 입력입니다";
            if (isEmptyString(newValue)) return "이메일을 입력해주세요";
            return "";
        },
    },
    password: {
        initialValue: "",
        isRequired: true,
        validation: (newValue: FieldValue) => {
            if (typeof newValue !== "string") return "비정상적인 입력입니다";
            if (isEmptyString(newValue)) return "비밀번호를 입력해주세요";
            return "";
        },
    },
};

function LoginForm() {
    const { values, errors, isRequired, changeFieldValue } = useForm(
        fieldInfos,
        (formValues) => {
            console.log(formValues);
        }
    );
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            console.log("로그인 요청:", values);
            const data = await signIn({
                email: values.email as string,
                password: values.password as string,
            });

            console.log("로그인 응답:", data);

            const token = localStorage.getItem("accessToken");
            console.log("저장된 토큰:", token);

            if (token) {
                alert(`로그인 성공! 환영합니다, ${data.user?.nickname || "사용자"}`);
            } else {
                throw new Error("토큰 저장 실패");
            }
        } catch (error: any) {
            console.error("로그인 에러:", error);
            setErrorMessage(error.response?.data?.message || "로그인 실패. 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
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
                name="password"
                type="password"
                title="password"
                value={values.password as string}
                onChange={(e) => changeFieldValue(e.target.value, "password")}
                error={errors.password}
                isRequired={isRequired.password}
            />
            {errorMessage && <p className="text-red-500 text-sm mt-3">{errorMessage}</p>}
            <p className="text-sm text-left text-[#00a9fb] mt-4 mb-4 hover:underline">
                비밀번호를 잊으셨나요?
            </p>
            <button
                type="submit"
                className="w-full py-2 rounded-[8px] bg-[#5865f2] hover:bg-blue-700 text-white"
                disabled={loading}
            >
                {loading ? "로그인 중..." : "로그인"}
            </button>
        </form>
    );
}

export default LoginForm;