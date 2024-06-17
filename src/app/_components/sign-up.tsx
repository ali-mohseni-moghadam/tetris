"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { UserState } from "~/utils/types/type";
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

  const { data } = clientApi.user.isAuth.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  if (data) {
    window.location.href = "/game";
  }

  const changeHnadler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setUserData((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = () => {
    createUser.mutate(userData);
  };

  return (
    <div className="mb-20 flex flex-col gap-2">
      <h2 className="mb-4 text-center">Sign Up Form</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={userData.name}
        onChange={changeHnadler}
        className="w-full rounded-full px-4 py-2 text-black"
        required
      />
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={userData.email}
        onChange={changeHnadler}
        className="w-full rounded-full px-4 py-2 text-black"
        required
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={userData.password}
        onChange={changeHnadler}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        onClick={handleSubmit}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createUser.isPending}
      >
        {createUser.isPending ? "Creating" : "Sign Up"}
      </button>
      <div className="mt-1 flex justify-between p-2.5">
        <span>Or If You Have Account</span>
        <button>
          <Link
            className="rounded border p-2 transition duration-300 hover:bg-white/5 hover:text-orange-500"
            href="/signin"
          >
            Login
          </Link>
        </button>
      </div>
    </div>
  );
}
