"use client";

import { useForm, useFormContext } from "react-hook-form";
import Image from "next/image";
import clsx from "clsx";

const avatars = [
  "/avatar/1.jpg",
  "/avatar/2.jpg",
  "/avatar/3.jpg",
  "/avatar/4.jpg",
];

export default function AvatarSelector() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const selected = watch("image_url");

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Choose your avatar
      </label>
      <div className="grid grid-cols-4 gap-4">
        {avatars.map((url) => (
          <button
            type="button"
            key={url}
            onClick={() => setValue("image_url", url)}
            className={clsx(
              "rounded-full border-4 p-1 transition hover:scale-105",
              selected === url ? "border-blue-500" : "border-transparent"
            )}
          >
            <Image
              src={url}
              alt="avatar"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
          </button>
        ))}
      </div>
      {errors.image_url && (
        <p className="mt-2 text-sm text-red-500">
          {(errors.image_url as any).message}
        </p>
      )}
      <input
        type="hidden"
        {...register("image_url", { required: "Please select an avatar" })}
      />
    </div>
  );
}
