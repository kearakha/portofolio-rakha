"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAction(_: unknown, formData: FormData) {
  try {
    await signIn("credentials", {
      password: formData.get("password") as string,
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Password salah." };
    }
    throw error; // rethrow redirect (bukan error)
  }
}
