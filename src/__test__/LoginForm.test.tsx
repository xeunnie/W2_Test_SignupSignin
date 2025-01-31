import LoginForm from "@/app/signin/components/LoginForm";
import { signIn } from "@/api/authService";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { fireEvent, waitFor } from "@testing-library/react";

// ✅ `signIn` API를 Mocking하여 실제 API 요청을 막음
jest.mock("@/api/authService", () => ({
    signIn: jest.fn(),
}));

describe("LoginForm 컴포넌트 테스트", () => {
    test("📌 이메일 & 비밀번호 입력 필드가 렌더링 되는지", () => {
        render(<LoginForm />);

        // 이메일 & 비밀번호 입력 필드 확인
        expect(screen.getByLabelText("이메일")).toBeInTheDocument();
        expect(screen.getByLabelText("비밀번호")).toBeInTheDocument();
    });

    test("📌 유효하지 않은 입력 시 에러 메시지 표시", async () => {
        render(<LoginForm />);

        const submitButton = screen.getByRole("button", { name: /로그인/i });

        // 빈 값으로 로그인 버튼 클릭
        fireEvent.click(submitButton);

        // 유효성 검사 에러 메시지 확인
        expect(await screen.findByText("이메일을 입력해주세요")).toBeInTheDocument();
        expect(await screen.findByText("비밀번호를 입력해주세요")).toBeInTheDocument();
    });

    test("📌 올바른 값 입력 후 `signIn` API가 호출되는지", async () => {
        render(<LoginForm />);

        const emailInput = screen.getByLabelText("이메일");
        const passwordInput = screen.getByLabelText("비밀번호");
        const submitButton = screen.getByRole("button", { name: /로그인/i });

        // 입력값 설정
        await userEvent.type(emailInput, "test@example.com");
        await userEvent.type(passwordInput, "password123");

        // `signIn` API를 Mock 구현하여 가짜 응답 반환
        (signIn as jest.Mock).mockResolvedValueOnce({
            user: { nickname: "승은" },
            accessToken: "mock-token",
        });

        // 로그인 버튼 클릭
        fireEvent.click(submitButton);

        // `signIn` API가 올바른 데이터로 호출되었는지 검증
        await waitFor(() => {
            expect(signIn).toHaveBeenCalledWith({
                email: "test@example.com",
                password: "password123",
            });
        });

        // 성공 메시지가 alert로 표시되는지 확인 (alert 모킹 필요)
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

        // 입력값 설정
        await userEvent.type(emailInput, "wrong@example.com");
        await userEvent.type(passwordInput, "wrongpassword");

        // `signIn` API가 실패하도록 Mock 설정
        (signIn as jest.Mock).mockRejectedValueOnce({
            response: { data: { message: "로그인 실패. 다시 시도해주세요." } },
        });

        // 로그인 버튼 클릭
        fireEvent.click(submitButton);

        // 에러 메시지가 표시되는지 확인
        expect(await screen.findByText("로그인 실패. 다시 시도해주세요.")).toBeInTheDocument();
    });

    test("📌 로그인 버튼 클릭 시 `로그인 중...`으로 변경", async () => {
        render(<LoginForm />);

        const emailInput = screen.getByLabelText("이메일");
        const passwordInput = screen.getByLabelText("비밀번호");
        const submitButton = screen.getByRole("button", { name: /로그인/i });

        userEvent.type(emailInput, "test@example.com");
        userEvent.type(passwordInput, "password123");

        // `signIn` API가 성공하도록 Mock 설정
        (signIn as jest.Mock).mockResolvedValueOnce({
            user: { nickname: "승은" },
            accessToken: "mock-token",
        });

        // 로그인 버튼 클릭
        fireEvent.click(submitButton);

        // 로그인 버튼이 "로그인 중..."으로 변경되는지 확인
        expect(submitButton).toHaveTextContent("로그인 중...");

        // 로그인 성공 후 버튼이 다시 "로그인"으로 돌아가는지 확인
        await waitFor(() => {
            expect(submitButton).toHaveTextContent("로그인");
        });
    });
});