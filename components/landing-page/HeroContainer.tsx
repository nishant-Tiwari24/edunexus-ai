"use client";
import React from "react";
import { ContainerScroll } from "../ui/Container";
import Image from "next/image";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden -mt-36">
      <ContainerScroll>
        <Image
          src={`/landing-page/bg1.webp`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
