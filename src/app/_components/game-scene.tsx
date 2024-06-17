"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { clientApi } from "~/trpc/react";

function GameScene() {
  const router = useRouter();
  const { data, isLoading } = clientApi.user.isAuth.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isLoading && !data) {
      router.push("/signin");
    }
  }, [isLoading, data, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Game scene</h2>
    </div>
  );
}

export default GameScene;
