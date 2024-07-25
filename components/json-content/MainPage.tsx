'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Loading from '../content/Loading';
import MarkdownPreview from '@uiw/react-markdown-preview';
import YouTube from 'react-youtube';

interface ContentItem {
  SubtopicId: string;
  content: string;
}

const JsonContentPage: React.FC = () => {
  const [content, setContent] = useState<ContentItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videos, setVideos] = useState<string[]>([]);
  const params = useParams();
  const router = useRouter();
  const key = process.env.YOUTUBE
  const subtopicId = params.content;

  console.log('subtopicId:', subtopicId);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`/api/content/${subtopicId}`);
        setContent(res.data);
        console.log('Fetched content:', res.data);
      } catch (err) {
        setError('Failed to fetch content');
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
              part: 'snippet',
              maxResults: 4,
              q: query,
              type: 'video',
              videoDuration: 'long',
              key: key
            }
          }
        );
        const videoIds = res.data.items.map((item: any) => item.id.videoId);
        setVideos(videoIds);
      } catch (err) {
        console.error('Failed to fetch YouTube videos:', err);
      }
    };

    if (content && content[0] && content[0].content) {
      const query = content[0].content.split(' ').slice(0, 20).join(' ');
      fetchYouTubeVideos(query);
    }
  }, [content]);

  if (error) {
    return (
      <div className="flex w-[100vw] h-[100vh] items-center justify-center">
        <Loading />
      </div>
    );
  }


  if (!content || content.length === 0) {
    return <div className="text-gray-500">No content found</div>;
  }

  return (
    <div className="bg-black p-10 border-zinc-600 max-w-7xl">
      <div className="rounded-md text-zinc-200 relative overflow-hidden">
        <div>
          <MarkdownPreview
            source={content[0].content}
            style={{ padding: 16, fontSize: '19px', color: 'white', background: 'black' }}
          />
        </div>
      </div>
      
      <div className='mt-10 '>
      <h2 className="text-xl font-bold text-white mb-4">Related Videos</h2>
      <div className="grid grid-cols-2 gap-8">
        {videos.map((videoId) => (
          <YouTube key={videoId} videoId={videoId} opts={{ width: '100%', height: '390' }} />
        ))}
      </div>
      <button onClick={() => router.back()} className="mt-4 text-gray-500 hover:text-gray-300">
        Go Back
      </button>
    </div>
    </div>
  );
};

export default JsonContentPage;
