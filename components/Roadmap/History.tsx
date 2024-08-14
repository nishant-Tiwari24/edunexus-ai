"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const History: React.FC = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.get("/api/responses");
        setResponses(response.data);
        console.log(response.data);
        toast.success("Responses loaded successfully!");
      } catch (error) {
        setError("Failed to fetch responses");
        toast.error("Failed to fetch responses");
      } finally {
        setLoading(false);
        toast.dismiss();
      }
    };

    fetchResponses();
  }, []);

  const handleItemClick = (responseId: number) => {
    router.push(`/roadmap/${responseId}`);
  };

  const renderLoading = () => (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="bg-zinc-800 p-3 rounded-md animate-pulse">
          <p className="bg-zinc-700 h-6 w-3/4 mb-2 rounded"></p>
          <p className="bg-zinc-700 h-4 w-1/2 rounded"></p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-black p-4 border-zinc-600 h-[720px] border-2 overflow-y-scroll rounded-2xl">
      <Toaster />
      <h2 className="text-zinc-200  text-xl text-center font-medium mb-2">
        History of Roadmap Generated
      </h2>
      {loading ? (
        renderLoading()
      ) : (
        <div className="space-y-2">
          {responses.map((response) => (
            <div
              key={response.id}
              className="bg-zinc-800 p-3 rounded-md text-zinc-200 cursor-pointer"
              onClick={() => handleItemClick(response.id)}
            >
              <p>{response.title}</p>
            </div>
          ))}
        </div>
      )}
      {error && <div className="text-red-500 text-center">{error}</div>}
    </div>
  );
};

export default History;
