// app/actions/auth-actions.js
"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function signInAction(prevState, formData) {
  const username = formData.get("username");
  const password = formData.get("password");

  // Simple validation
  if (!username || !password) {
    return {
      errors: {
        username: !username ? ["Username is required"] : [],
        password: !password ? ["Password is required"] : [],
      },
      authError: null,
    };
  }

  try {
    // Simulate database check (replace with actual DB call)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock authentication - replace with real authentication
    if (username === "admin" && password === "password") {
      // Set auth cookie (in real app, use secure session token)
      cookies().set("auth", "true", { secure: true });
      return { success: true, errors: null, authError: null };
    } else {
      return {
        authError: { form: "Invalid username or password" },
        errors: null,
      };
    }
  } catch (error) {
    return {
      authError: { form: "An error occurred during login" },
      errors: null,
    };
  }
}
