"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { UserState } from "utils/types/type";
import { api } from "~/trpc/react";
import Link from "next/link";

export function CreateUser() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserState>({
    name: "",
    email: "",
    password: "",
  });

  const createUser = api.user.createUser.useMutation();

  const changeHnadler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setUserData((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = () => {
    try {
      createUser.mutate(userData);
      setUserData({
        name: "",
        email: "",
        password: "",
      });
      router.refresh();
    } catch (error) {
      console.log(`failed to create user:`, error);
    }
  };

  return (
    <div>
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
          // disabled={getData.isPending}
        >
          {createUser.isPending ? "Creating" : "Sign Up"}
        </button>
        <div className="mt-1 flex justify-between p-2.5">
          <span>Or If You Have Account</span>
          <button>
            <Link
              className="rounded border p-2 transition duration-300 hover:bg-white/5 hover:text-orange-500"
              href="/login"
            >
              Login
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
