"use client";
import React, { useEffect, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

const Revision: React.FC = () => {
  const [revisionContent, setRevisionContent] = useState<string>("");

  useEffect(() => {
    const content = localStorage.getItem("revisionContent");
    if (content) {
      setRevisionContent(content);
    }
  }, []);

  return (
    <div className="min-h-screen p-4">
      <MarkdownPreview
        source={revisionContent}
        style={{
          padding: 16,
          fontSize: "16px",
          color: "white",
          background: "black",
        }}
      />
    </div>
  );
};

export default Revision;
