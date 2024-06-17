"use client";

import React, { useState } from "react";
import { clientApi } from "~/trpc/react";

function SignIn() {
  const [loginData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { error, isPending, mutate } = clientApi.user.login.useMutation({
    onSuccess: (data) => {
      setUserData({
        email: "",
        password: "",
      });
      if (data) {
        window.location.href = "/game";
        return null;
      }
    },
    onError: (error) => {
      console.error("Failed to login:", error);
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
        disabled={isPending}
      >
        {isPending ? "Loading..." : "Login"}
      </button>
    </div>
  );
}

export default SignIn;
