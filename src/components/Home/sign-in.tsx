"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { clientApi } from "~/trpc/react";

function SignIn() {
  const router = useRouter();
  const [loginData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { error, isPending, mutate } = clientApi.user.login.useMutation({
    onSuccess: () => {
      setUserData({
        email: "",
        password: "",
      });
      router.push("/game");
    },
    onError: (error) => {
      console.error("Failed to login:", error);
    },
  });

  const { isSuccess, isLoading } = clientApi.user.isAuth.useQuery(undefined, {
    refetchOnWindowFocus: false,
    retry: 0,
  });

  useEffect(() => {
    if (isSuccess) {
      router.push("/game");
    }
  }, [isSuccess, router]);

  const changeHnadler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setUserData((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = () => {
    mutate(loginData);
  };

  if (error) return <h3>Error happened!</h3>;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="mb-20 flex flex-col gap-2 rounded border border-gray-700 bg-gray-800/50 p-5 backdrop-blur-md">
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-200">
        Sign In Form
      </h2>
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={loginData.email}
        onChange={changeHnadler}
        className="w-full rounded-full bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-gray-700"
        required
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={loginData.password}
        onChange={changeHnadler}
        className="mb-4 w-full rounded-full bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-gray-700"
      />
      <button
        onClick={handleSubmit}
        className="rounded-full bg-violet-700 px-10 py-3 font-semibold text-white transition duration-500 hover:bg-violet-900"
        disabled={isPending}
      >
        {isPending ? "Loading..." : "Login"}
      </button>
      <div className="mt-1 flex flex-col items-center p-2">
        <span className="mb-4">Or If You Dont Have an Account</span>
        <button>
          <Link
            className="rounded border border-gray-600 bg-gray-700 p-2 transition duration-300 hover:bg-gray-900 hover:text-orange-500"
            href="/signup"
          >
            Sign Up
          </Link>
        </button>
      </div>
    </div>
  );
}

export default SignIn;
