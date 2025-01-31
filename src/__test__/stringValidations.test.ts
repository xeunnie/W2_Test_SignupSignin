import {
    isEmptyString,
    isLengthBetween,
    isEmail,
    isPassword,
    isNickname,
    isName,
} from "@/utils/stringValidations"

describe("문자열 유효성 검사 함수 테스트", () => {
    test("isEmptyString - 빈 문자열 테스트", () => {
        expect(isEmptyString("")).toBe(true);
        expect(isEmptyString(" ")).toBe(true);
        expect(isEmptyString("  ")).toBe(true);
        expect(isEmptyString("hello")).toBe(false);
    });

    test("isLengthBetween - 문자열 길이 테스트", () => {
        expect(isLengthBetween("hello", 3, 10)).toBe(true);
        expect(isLengthBetween("hi", 3, 10)).toBe(false);
        expect(isLengthBetween("this is a long string", 3, 10)).toBe(false);
    });

    test("isEmail - 이메일 유효성 테스트", () => {
        expect(isEmail("test@example.com")).toBe(true);
        expect(isEmail("a@b.com")).toBe(false);
        expect(isEmail("invalid-email")).toBe(false);
        expect(isEmail("user.name@domain.co")).toBe(false);
    });

    test("isPassword - 비밀번호 유효성 테스트", () => {
        expect(isPassword("pass1234")).toBe(true);
        expect(isPassword("password")).toBe(false);
        expect(isPassword("123456")).toBe(false);
        expect(isPassword("short1")).toBe(true);
        expect(isPassword("thisisaverylongpassword123456")).toBe(false);
    });

    test("isNickname - 닉네임 유효성 테스트", () => {
        expect(isNickname("hello123")).toBe(true);
        expect(isNickname("한글닉네임")).toBe(true);
        expect(isNickname("닉네")).toBe(true);
        expect(isNickname("!!!")).toBe(false);
    });

    test("isName - 이름 유효성 테스트", () => {
        expect(isName("홍길동")).toBe(true);
        expect(isName("JohnDoe")).toBe(true);
        expect(isName("A")).toBe(false);
        expect(isName("1234")).toBe(false);
    });
});