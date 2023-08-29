"use client";

// IMPORTS -
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div
      className="font-medium text-2xl cursor-pointer"
      onClick={() => {
        router.push("/");
      }}
    >
      airbnb
    </div>
  );
};

export default Logo;
