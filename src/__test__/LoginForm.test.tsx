import LoginForm from "@/app/signin/components/LoginForm";
import userEvent from "@testing-library/user-event";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { signIn } from "@/api/authService";


// ✅ `signIn` API를 Mocking하여 실제 API 요청을 막음
jest.mock("@/api/authService", () => ({
    signIn: jest.fn(),
}));

describe("LoginForm 컴포넌트 테스트", () => {
    test("📌 이메일 & 비밀번호 입력 필드가 렌더링 되는지", () => {
        render(<LoginForm />);

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    test("📌 유효하지 않은 입력 시 에러 메시지 표시", async () => {
        render(<LoginForm />);

        const submitButton = screen.getByRole("button", { name: /로그인/i });

        fireEvent.click(submitButton);

        expect(await screen.findByText("이메일을 입력해주세요")).toBeInTheDocument();
        expect(await screen.findByText("비밀번호를 입력해주세요")).toBeInTheDocument();
    });

    test("📌 올바른 값 입력 후 `signIn` API가 호출되는지", async () => {
        render(<LoginForm />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole("button");

        await userEvent.type(emailInput, "test@example.com");
        await userEvent.type(passwordInput, "password123");

        (signIn as jest.Mock).mockResolvedValueOnce({
            user: { nickname: "승은" },
            accessToken: "mock-token",
        });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(signIn).toHaveBeenCalledWith({
                email: "test@example.com",
                password: "password123",
            });
        });

        jest.spyOn(window, "alert").mockImplementation(() => {});
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("로그인 성공! 환영합니다, 승은");
        });
    });

    test("📌 로그인 실패 시 에러 메시지가 표시되는지", async () => {
        render(<LoginForm />);

        const emailInput = screen.getByLabelText("이메일");
        const passwordInput = screen.getByLabelText("비밀번호");
        const submitButton = screen.getByRole("button", { name: /로그인/i });

        await userEvent.type(emailInput, "wrong@example.com");
        await userEvent.type(passwordInput, "wrongpassword");

        (signIn as jest.Mock).mockRejectedValueOnce({
            response: { data: { message: "로그인 실패. 다시 시도해주세요." } },
        });

        fireEvent.click(submitButton);

        expect(await screen.findByText("로그인 실패. 다시 시도해주세요.")).toBeInTheDocument();
    });

    test("📌 로그인 버튼 클릭 시 `로그인 중...`으로 변경", async () => {
        render(<LoginForm />);

        const emailInput = screen.getByLabelText("이메일");
        const passwordInput = screen.getByLabelText("비밀번호");
        const submitButton = screen.getByRole("button", { name: /로그인/i });

        await userEvent.type(emailInput, "test@example.com");
        await userEvent.type(passwordInput, "password123");

        (signIn as jest.Mock).mockResolvedValueOnce({
            user: { nickname: "승은" },
            accessToken: "mock-token",
        });

        fireEvent.click(submitButton);

        expect(submitButton).toHaveTextContent("로그인 중...");

        await waitFor(() => {
            expect(submitButton).toHaveTextContent("로그인");
        });
    });
});