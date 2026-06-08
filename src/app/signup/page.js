"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Save additional user data in Firestore
      await setDoc(doc(db, "Users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: name,
        role: "student", // default role
        createdAt: new Date().toISOString()
      });

      router.push("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("이미 사용 중인 이메일입니다.");
      } else if (err.code === "auth/weak-password") {
        setError("비밀번호는 6자리 이상이어야 합니다.");
      } else {
        setError("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] px-4">
      <div className="max-w-md w-full bg-[#1a1a1a] border border-[#333] rounded-2xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center tracking-tight">회원가입</h2>
        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">{error}</div>}
        
        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#a0a0a0] mb-2">이름</label>
            <input
              type="text"
              required
              className="w-full bg-[#121212] border border-[#333] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#CAFF33] transition-colors"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
            />
          </div>
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
              placeholder="비밀번호 (6자리 이상)"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#CAFF33] text-[#202020] font-bold text-lg py-3 rounded-xl hover:bg-[#aaff00] transition-transform active:scale-95 mt-4"
          >
            가입하기
          </button>
        </form>
        <div className="mt-8 text-center text-[#a0a0a0]">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-[#CAFF33] hover:underline font-medium">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
