import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

export default function BackButton({ title }) {
  const router = useRouter();

  return (
    <div
      className="flex items-center cursor-pointer idden p-4"
      onClick={() => router.push("/profile")}
    >
      <Image
        className="mx-4"
        src="/icons/back.svg"
        width={15}
        height={12}
        alt="icon"
      />
      <p>{title}</p>
    </div>
  );
}
