"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] px-4">
      <div className="max-w-md w-full bg-[#1a1a1a] border border-[#333] rounded-2xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center tracking-tight">로그인</h2>
        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#a0a0a0] mb-2">이메일</label>
            <input
              type="email"
              required
              className="w-full bg-[#121212] border border-[#333] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#CAFF33] transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#a0a0a0] mb-2">비밀번호</label>
            <input
              type="password"
              required
              className="w-full bg-[#121212] border border-[#333] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#CAFF33] transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#CAFF33] text-[#202020] font-bold text-lg py-3 rounded-xl hover:bg-[#aaff00] transition-transform active:scale-95"
          >
            로그인
          </button>
        </form>
        <div className="mt-8 text-center text-[#a0a0a0]">
          계정이 없으신가요?{" "}
          <Link href="/signup" className="text-[#CAFF33] hover:underline font-medium">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
