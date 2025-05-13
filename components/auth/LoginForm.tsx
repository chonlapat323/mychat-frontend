"use client";

import { useForm } from "react-hook-form";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { EyeCloseIcon, EyeIcon } from "../icons";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hook/api/auth/useLogin";
import { LoginPayload } from "@/types/auth/login-payload";

export default function LoginForm() {
  const router = useRouter();
  const { handleLogin, loading, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginPayload>();

  const onSubmit = async (data: LoginPayload) => {
    try {
      const res = await handleLogin(data);
      if (res.success) {
        router.push("/");
      } else {
        setError("email", {
          message: "Incorrect email or password. Please try again.",
        });
      }
    } catch (err) {
      setError("email", {
        message: "Incorrect email or password. Please try again.",
      });
      console.error("❌ Login failed", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            Sign In
          </h1>
          <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
            Enter your email and password to log in to your account.
          </p>
        </div>
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="space-y-6"
        >
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              {...register("email", { required: "email is required" })}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <Label>Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "password is required" })}
                placeholder="Enter your password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <EyeIcon className="w-5 h-5 fill-gray-500 dark:fill-gray-400" />
                ) : (
                  <EyeCloseIcon className="w-5 h-5 fill-gray-500 dark:fill-gray-400" />
                )}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-sm font-semibold text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-700 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-brand-500 hover:text-brand-600 font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
