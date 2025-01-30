import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  const token = (await cookies()).get("accessToken");

  if (!token) {
    redirect("/signin");
  }

  return <h1>홈페이지 - 로그인된 사용자만 접근 가능</h1>;
}