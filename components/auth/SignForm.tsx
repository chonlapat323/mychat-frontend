"use client";

import { FormProvider, useForm } from "react-hook-form";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { EyeCloseIcon, EyeIcon } from "../icons";
import Link from "next/link";
import React, { useState } from "react";
import { useRegister } from "@/hooks/api/auth/useRegister";
import { RegisterForm } from "@/types/auth/register-playload";
import AvatarSelector from "../form/AvatarSelector";
import { useRouter } from "next/navigation";

export default function SignForm() {
  const router = useRouter();
  const { handleRegister, loading, error } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const methods = useForm<RegisterForm>({
    defaultValues: {
      image_url: "/avatar/1.jpg",
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const password = watch("password");

  const onSubmit = async (data: RegisterForm) => {
    try {
      const { confirm_password, ...payload } = data;
      await handleRegister(payload);
      router.push("/signin");
    } catch (err) {
      console.error("❌ Register failed", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            Sign Up
          </h1>
          <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
            Fill out your name, email, and password to sign up for an account.
          </p>
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
              <div>
                <AvatarSelector />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label>
                  First Name<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="first_name"
                  {...register("first_name", {
                    required: "first name is required",
                  })}
                  name="first_name"
                  placeholder="Enter your first name"
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
              <div>
                <Label>
                  Last Name<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="last_name"
                  {...register("last_name", {
                    required: "last name is required",
                  })}
                  name="last_name"
                  placeholder="Enter your last name"
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label>
                Email<span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                autoComplete="off"
                id="email"
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
                name="email"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label>
                Password<span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "password is required",
                  })}
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="new-password"
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
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Label>
                Password Again<span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="confirm_password"
                  {...register("confirm_password", {
                    required: "confirm password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  name="confirm_password"
                  type={showPasswordAgain ? "text" : "password"}
                  placeholder="Enter your password again"
                  autoComplete="new-password"
                />
                <span
                  onClick={() => setShowPasswordAgain(!showPasswordAgain)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPasswordAgain ? (
                    <EyeIcon className="w-5 h-5 fill-gray-500 dark:fill-gray-400" />
                  ) : (
                    <EyeCloseIcon className="w-5 h-5 fill-gray-500 dark:fill-gray-400" />
                  )}
                </span>
              </div>
              {errors.confirm_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 text-sm font-semibold text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition"
            >
              Sign Up
            </button>
          </form>
        </FormProvider>

        <p className="text-sm text-center text-gray-700 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-brand-500 hover:text-brand-600 dark:text-brand-400 font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
