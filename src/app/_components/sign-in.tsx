"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { api } from "~/trpc/react";

function SignIn() {
  const router = useRouter();
  const [loginData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { data, error, isPending, mutate } = api.user.login.useMutation({
    onSuccess: (data) => {
      setUserData({
        email: "",
        password: "",
      });
      if (data) router.push("/game");
    },
    onError: (error) => {
      console.error("Failed to login:", error);
    },
  });

  const changeHnadler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setUserData((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = () => {
    mutate(loginData);
  };

  if (error) return <h3>Error happened!</h3>;

  return (
    <div className="mb-20 flex flex-col gap-2">
      <h2 className="mb-4 text-center">Sign In Form</h2>
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={loginData.email}
        onChange={changeHnadler}
        className="w-full rounded-full px-4 py-2 text-black"
        required
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={loginData.password}
        onChange={changeHnadler}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        onClick={handleSubmit}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        // disabled={createUser.isPending}
      >
        {isPending ? "Loading..." : "Login"}
      </button>
    </div>
  );
}

export default SignIn;
