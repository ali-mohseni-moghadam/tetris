"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { clientApi } from "~/trpc/react";
import { deleteToken } from "~/utils/cookie";
import GameReact from "../GameUi/Game";

const GameScene: React.FC = () => {
  const router = useRouter();

  const { isLoading, error } = clientApi.user.isAuth.useQuery(undefined, {
    retry: 0,
  });

  useEffect(() => {
    if (error) {
      router.push("/signin");
    }
  }, [error, router]);

  const deleteHandler = async () => {
    await deleteToken();

    router.push("signin");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden">
      <nav className=" flex items-center justify-between border-b border-gray-700 bg-gray-800/50 px-6 py-4 backdrop-blur-md">
        <div>
          <p className="font-bold">User</p>
          <p className="text-sm text-gray-400">Score: 0</p>
        </div>
        <button
          onClick={deleteHandler}
          className="rounded-full border-gray-600 bg-gray-600 px-6 py-2 font-semibold text-white transition duration-300 hover:bg-gray-900 hover:text-orange-500"
        >
          Log Out
        </button>
      </nav>
      <main className="flex flex-col items-center justify-center">
        {/* <h2 className="mb-4 text-3xl font-bold text-gray-200">Game Scene</h2> */}
        <GameReact />
      </main>
    </div>
  );
};

export default GameScene;
