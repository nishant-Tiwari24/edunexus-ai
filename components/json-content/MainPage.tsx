"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Loading from "../content/Loading";
import MarkdownPreview from "@uiw/react-markdown-preview";
import rehypeRaw from "rehype-raw";
import YouTube from "react-youtube";

interface ContentItem {
  SubtopicId: string;
  content: string;
  id: string;
}

const JsonContentPage: React.FC = () => {
  const [content, setContent] = useState<ContentItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videos, setVideos] = useState<string[]>([]);
  const [relatedLinks, setRelatedLinks] = useState<string[]>([]);
  const [relatedImages, setRelatedImages] = useState<string[]>([]);
  const params = useParams();
  const router = useRouter();
  const key = process.env.YOUTUBE;
  const subtopicId = params.content;
  const responses = params.responses;
  const json = params.jsoncontent;
  console.log(responses);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`/api/content/${subtopicId}`);
        setContent(res.data);
        console.log("Fetched content:", res.data);
      } catch (err) {
        setError("Failed to fetch content");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [subtopicId]);

  useEffect(() => {
    const fetchYouTubeVideos = async (query: string) => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              part: "snippet",
              maxResults: 4,
              q: query,
              type: "video",
              videoDuration: "long",
              key: "AIzaSyB4ykPOOqLE0fMIBfF42JZxlC6Td_RpFHs",
            },
          }
        );
        const videoIds = res.data.items.map((item: any) => item.id.videoId);
        setVideos(videoIds);
      } catch (err) {
        console.error("Failed to fetch YouTube videos:", err);
      }
    };

    if (content && content[0] && content[0].content) {
      const query = content[0].content.split(" ").slice(0, 20).join(" ");
      fetchYouTubeVideos(query);
    }
  }, [content, key]);

  useEffect(() => {
    const fetchRelatedLinks = async (query: string) => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/customsearch/v1`,
          {
            params: {
              q: query,
              num: 10,
              key: "AIzaSyB4ykPOOqLE0fMIBfF42JZxlC6Td_RpFHs",
              cx: "c70db5151c8de4e95",
            },
          }
        );
        const links = res.data.items.map((item: any) => item.link);
        setRelatedLinks(links);
      } catch (err) {
        console.error("Failed to fetch related links:", err);
      }
    };

    if (content && content[0] && content[0].content) {
      const query = content[0].content.split(" ").slice(0, 20).join(" ");
      fetchRelatedLinks(query);
    }
  }, [content]);

  useEffect(() => {
    const fetchRelatedImages = async (query: string) => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/customsearch/v1`,
          {
            params: {
              q: query,
              num: 4,
              searchType: "image",
              key: "AIzaSyB4ykPOOqLE0fMIBfF42JZxlC6Td_RpFHs",
              cx: "c70db5151c8de4e95",
            },
          }
        );
        const images = res.data.items.map((item: any) => item.link);
        setRelatedImages(images);
      } catch (err) {
        console.error("Failed to fetch related images:", err);
      }
    };

    if (content && content[0] && content[0].content) {
      const query = content[0].content.split(" ").slice(0, 400).join(" ");
      fetchRelatedImages(query);
    }
  }, [content]);

  const components = {
    p: ({ node, children }: any) => {
      const paragraphContent = children[0];
      const contentLength = content ? content[0].content.length : 0;
      const paragraphPosition = node.position.start.offset;

      if (
        relatedImages.length > 0 &&
        paragraphPosition >= contentLength / 2 &&
        paragraphPosition < contentLength / 2 + 100
      ) {
        return (
          <div>
            <p>{children}</p>
            <div className="grid grid-cols-4 gap-2 my-4">
              {relatedImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Related image ${index + 1}`}
                  className="w-[400px] h-[400px] rounded-md object-cover"
                />
              ))}
            </div>
          </div>
        );
      }

      return <p>{children}</p>;
    },
  };

  if (error) {
    return (
      <div className="flex w-[100vw] h-[100vh] items-center justify-center flex-col"></div>
    );
  }

  if (!content || content.length === 0) {
    return <div className="text-gray-500">No content found</div>;
  }

  function handleQuiz(contentId: string) {
    router.push(`/roadmap/${responses}/${json}/${subtopicId}/${contentId}`);
    axios.post(`/api/quiz/${contentId}`);
  }

  function handleAssessments(contentId: string) {
    router.push(
      `/roadmap/${responses}/${json}/${subtopicId}/${contentId}/megaassessments`
    );
    axios.post(`/api/megaquestions/${contentId}`);
  }

  return (
    <div className="bg-black p-10 border-zinc-600 max-w-7xl">
      <div className="rounded-md text-zinc-200 relative overflow-hidden">
        <div>
          <MarkdownPreview
            source={content[0].content}
            rehypePlugins={[rehypeRaw]}
            components={components}
            className="font-light text-white-100  bg-zinc-900 text-xl"
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-white mb-4">Related Videos</h2>
        <div className="grid grid-cols-2 gap-8">
          {videos.map((videoId) => (
            <YouTube
              key={videoId}
              videoId={videoId}
              opts={{ width: "100%", height: "390" }}
            />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-white mb-4">Related Content</h2>
        <ul className="list-disc pl-5 text-gray-300">
          {relatedLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-400 hover:underline"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col mt-10 space-y-1">
        <div className="text-2xl mb-6 font-semibold text-white">
          <p>
            🕹️ You're almost there! Complete these levels to reach the next
            milestone.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="text-white hover:text-zinc-300 bg-zinc-800 border-[1px] border-zinc-700 px-4 py-2 rounded-lg transition-transform transform hover:scale-105 hover:bg-zinc-700 flex items-center space-x-2"
          >
            <span className="text-lg">🔙</span>
            <span>Go Back</span>
          </button>

          <button
            onClick={() => handleQuiz(content[0].id)}
            className="text-white hover:text-zinc-300 bg-zinc-800 border-[1px] border-zinc-700 px-4 py-2 rounded-lg transition-transform transform hover:scale-105 hover:bg-zinc-700 flex items-center space-x-2"
          >
            <span className="text-lg">🎯</span>
            <span>Checkout Your Knowledge</span>
          </button>

          <button
            onClick={() => handleAssessments(content[0].id)}
            className="text-white hover:text-zinc-300 bg-zinc-800 border-[1px] border-zinc-700 px-4 py-2 rounded-lg transition-transform transform hover:scale-105 hover:bg-zinc-700 flex items-center space-x-2"
          >
            <span className="text-lg">🧠</span>
            <span>Mega Assessments</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JsonContentPage;
