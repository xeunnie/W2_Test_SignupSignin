import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignupForm from "@/app/signup/components/SignupForm";
import { signUp } from "@/api/authService";
import userEvent from "@testing-library/user-event";

jest.mock("@/api/authService", () => ({
    signUp: jest.fn(),
}));

describe("SignupForm", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("회원가입 폼이 정상적으로 렌더링되는지 확인", () => {
        render(<SignupForm />);

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/nickname/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        // expect(screen.getByText(/birthdate/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /계속하기/i })).toBeInTheDocument();
    });

    test("입력 필드에 유효한 값을 입력했을 때, 값이 변경되는지 확인", async () => {
        render(<SignupForm />);
        screen.debug();

        const emailInput = screen.getByLabelText(/email/i);
        const nameInput = screen.getByLabelText(/username/i);
        const nicknameInput = screen.getByLabelText(/nickname/i);
        const passwordInput = screen.getByLabelText(/password/i);

        await userEvent.type(emailInput, "test@example.com");
        await userEvent.type(nameInput, "홍길동");
        await userEvent.type(nicknameInput, "길동이");
        await userEvent.type(passwordInput, "Password123!");

        expect(emailInput).toHaveValue("test@example.com");
        expect(nameInput).toHaveValue("홍길동");
        expect(nicknameInput).toHaveValue("길동이");
        expect(passwordInput).toHaveValue("Password123!");
    });

    test("유효하지 않은 입력값이 주어졌을 때, 에러 메시지가 표시되는지 확인", async () => {
        render(<SignupForm />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);

        await userEvent.type(emailInput, "invalid-email");
        await userEvent.type(passwordInput, "123");

        fireEvent.blur(emailInput);
        fireEvent.blur(passwordInput);

        await waitFor(() => {
            expect(screen.getByTestId("email-error")).toHaveTextContent(
                "이메일 형식이 아닙니다"
            );
        });
        await waitFor(() => {
            expect(screen.getByTestId("password-error")).toHaveTextContent(
                "비밀번호 형식이 아닙니다"
            );
        });
    });

    test("회원가입 버튼 클릭 시 signUp API가 호출되는지 확인", async () => {
        (signUp as jest.Mock).mockResolvedValueOnce({});

        render(<SignupForm />);

        const emailInput = screen.getByLabelText(/email/i);
        const nameInput = screen.getByLabelText(/username/i);
        const nicknameInput = screen.getByLabelText(/nickname/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole("button", { name: /계속하기/i });

        await userEvent.type(emailInput, "test@example.com");
        await userEvent.type(nameInput, "홍길동");
        await userEvent.type(nicknameInput, "길동이");
        await userEvent.type(passwordInput, "Password123!");

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(signUp).toHaveBeenCalledTimes(1);
            expect(signUp).toHaveBeenCalledWith({
                email: "test@example.com",
                name: "홍길동",
                nickname: "길동이",
                password: "Password123!",
                birthdate: "0000-00-00",
            });
        });
    });

    test("회원가입 요청 실패 시 에러 메시지가 표시되는지 확인", async () => {
        (signUp as jest.Mock).mockRejectedValueOnce({
            response: { data: { message: "회원가입에 실패했습니다." } },
        });

        render(<SignupForm />);

        const emailInput = screen.getByLabelText(/email/i);
        const nameInput = screen.getByLabelText(/username/i);
        const nicknameInput = screen.getByLabelText(/nickname/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole("button", { name: /계속하기/i });

        await userEvent.type(emailInput, "test@example.com");
        await userEvent.type(nameInput, "홍길동");
        await userEvent.type(nicknameInput, "길동이");
        await userEvent.type(passwordInput, "Password123!");

        fireEvent.click(submitButton);

        expect(await screen.findByText(/회원가입에 실패했습니다./i)).toBeInTheDocument();
    });

    test("가입 중 로딩 상태를 확인", async () => {
        jest.spyOn(window, "alert").mockImplementation(() => {});
        (signUp as jest.Mock).mockResolvedValueOnce({});
        // (signUp as jest.Mock).mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 1000)));
        render(<SignupForm />);
        const emailInput = screen.getByLabelText(/email/i);
        const nameInput = screen.getByLabelText(/username/i);
        const nicknameInput = screen.getByLabelText(/nickname/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole("button", { name: /계속하기/i });
        await userEvent.type(emailInput, "test@example.com");
        await userEvent.type(nameInput, "홍길동");
        await userEvent.type(nicknameInput, "길동이");
        await userEvent.type(passwordInput, "Password123!");
        fireEvent.click(submitButton);
        await waitFor(() => {expect(submitButton).toBeDisabled();});
        await waitFor(() => {expect(submitButton).not.toBeDisabled();});
        // expect(submitButton).toHaveTextContent("가입 중...");
        // await waitFor(() => expect(submitButton).toHaveTextContent("계속하기"));
        expect(window.alert).toHaveBeenCalledWith("회원가입 성공! 로그인 해주세요.");
        jest.restoreAllMocks();
    });
});