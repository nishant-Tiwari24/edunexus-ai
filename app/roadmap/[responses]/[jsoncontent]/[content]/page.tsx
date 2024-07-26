import JsonContentPage from "@/components/json-content/MainPage";
import Sidebar from "@/components/json-content/Sidebar";
import React from "react";

const page = () => {
  return (
    <div className="flex">
      <div className="w-1/3">
        <Sidebar />
      </div>
      <JsonContentPage />
    </div>
  );
};

export default page;
