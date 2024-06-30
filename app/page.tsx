"use client";

import { navItems } from "@/data";

import Hero from "@/components/landing-page/Hero";
import Footer from "@/components/landing-page/Footer";
import Clients from "@/components/landing-page/Clients";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { HeroScrollDemo } from "@/components/landing-page/HeroContainer";

const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className=" w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <HeroScrollDemo />
        <Clients />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
