import Sidebar from "@/components/json-content/Sidebar";
import Quiz from "@/components/quiz/Quiz";
import Revision from "@/components/revision/Revision";
import React from "react";

const Page = () => {
  return (
    <div className="flex">
      <div className="w-1/4 shadow-lg">
        <Sidebar />
      </div>
      <div className="w-3/4">
        <Revision />
      </div>
    </div>
  );
};

export default Page;