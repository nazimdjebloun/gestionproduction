"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Key } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useActionState, useState, useEffect } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/auth-context";

const signInAction = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

export default function SignIn({}) {
  // const [state, formAction, Isloading] = useActionState(signInAction, null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // For presentation purposes, simple validation
    if (!email || !password) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For presentation, any credentials will work
      const userData = {
        id: "12345",
        email,
        name: email.split("@")[0],
        role: "admin",
      };

      login(userData);
      toast.success("Login successful!");
      router.push("/");
    } catch (err) {
      setError("An error occurred during login");
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };
  // useEffect(() => {
  //   if (state?.success === true) {
  //     toast("login successful!");
  //     redirect("/");
  //   }
  // }, [state?.success]);

  return (
    <div className="w-[100%] flex justify-center items-center h-dvh relative">
      <div>
        <Card className="w-[300px] md:w-[400px]">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              // action={formAction}
            >
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {/* {state?.errors?.email && (
                    <p className="text-sm text-red-500">
                      {state.errors.email[0]}
                    </p>
                  )} */}
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  <Input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* {state?.errors?.password && (
                    <p className="text-sm text-red-500">
                      {state.errors.password[0]}
                    </p>
                  )} */}
                </div>
                {/* {state?.authError?.form && (
                  <p className="text-md text-red-500 text-center py-2">
                    {state.authError.form}
                  </p>
                )} */}
                {/* {state?.formError?.form && (
                  <p className="text-md text-red-500 text-center py-2">
                    {state.formError.form}
                  </p>
                )} */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
            <div className="flex justify-start gap-1 items-baseline py-5">
              <p className="text-xs md:text-sm">Don't have an accout ?</p>
              <Link href="/signup">
                <span className="ml-auto inline-block text-sm underline">
                  Sign Up
                </span>
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex justify-center w-full border-t py-4">
              <p className="text-center text-xl text-neutral-500">Dev Space</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}