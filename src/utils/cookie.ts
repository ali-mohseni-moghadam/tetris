"use server";

import { cookies } from "next/headers";

export async function deleteToken() {
  cookies().set("Cookie", " ", {
    path: "/",
    maxAge: 0,
  });
}

export async function getToken() {
  const cookie = cookies().get("Cookie");

  return cookie?.value ?? undefined;
}
