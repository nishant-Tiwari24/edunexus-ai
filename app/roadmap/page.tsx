import React from "react";
import RoadmapForm from "@/components/roadmap/RoadmapForm";
import History from "@/components/roadmap/History";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/data";
import Footer from "@/components/landing-page/Footer";

const HomePage: React.FC = () => {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className=" min-h-screen text-white py-36 bg-contain bg-center">
        <div className="max-w-7xl h-full mx-auto">
          <header className="flex justify-center items-center mb-8">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-300">
              AI Roadmap <span className="text-white-100">Generator</span>
            </h1>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <RoadmapForm />
            </div>
            <History />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;
