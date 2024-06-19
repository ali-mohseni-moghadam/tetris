"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { UserState } from "~/types/type";
import { clientApi } from "~/trpc/react";
import Link from "next/link";

export function SignUp() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserState>({
    name: "",
    email: "",
    password: "",
  });

  const createUser = clientApi.user.createUser.useMutation({
    onSuccess: () => {
      setUserData({
        name: "",
        email: "",
        password: "",
      });
      router.push("/signin");
    },
    onError: (error) => {
      console.log(`Failed to create user`, error);
    },
  });

  const { isSuccess, isLoading } = clientApi.user.isAuth.useQuery(undefined, {
    retry: 0,
    refetchOnWindowFocus: false,
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
    createUser.mutate(userData);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className=" mb-20 flex flex-col gap-2 rounded border border-gray-700 bg-gray-800/50 p-5 backdrop-blur-md">
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-200">
        Sign Up Form
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={userData.name}
        onChange={changeHnadler}
        className="w-full rounded-full bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-gray-700"
        required
      />
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={userData.email}
        onChange={changeHnadler}
        className="w-full rounded-full bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-gray-700"
        required
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={userData.password}
        onChange={changeHnadler}
        className="mb-4 w-full rounded-full bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-gray-700"
      />
      <button
        onClick={handleSubmit}
        className="rounded-full bg-violet-700 px-10 py-3 font-semibold text-white transition duration-500 hover:bg-violet-900"
        disabled={createUser.isPending}
      >
        {createUser.isPending ? "Creating..." : "Sign Up"}
      </button>
      <div className="mt-1 flex justify-between p-2.5">
        <span>If You Have an Account</span>
        <button>
          <Link
            className="rounded border border-gray-600 bg-gray-700 p-2 transition duration-300 hover:bg-gray-900 hover:text-orange-500"
            href="/signin"
          >
            Login
          </Link>
        </button>
      </div>
    </div>
  );
}
