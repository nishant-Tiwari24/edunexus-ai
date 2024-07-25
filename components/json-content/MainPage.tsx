'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/components/Responses/Loading';
import MarkdownPreview from '@uiw/react-markdown-preview';
import katex from 'katex';
import 'katex/dist/katex.css';

interface ContentItem {
  SubtopicId: string;
  content: string;
}

const JsonContentPage: React.FC = () => {
  const [content, setContent] = useState<ContentItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();

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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
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
            components={{
              code: ({ children = [], className, ...props }) => {
                if (typeof children === 'string' && /^\$\$(.*)\$\$/.test(children)) {
                  const html = katex.renderToString(children.replace(/^\$\$(.*)\$\$/, '$1'), {
                    throwOnError: false,
                  });
                  return <code dangerouslySetInnerHTML={{ __html: html }} style={{ background: 'transparent' }} />;
                }
                const code = props.node && props.node.children ? props.node.children.toString() : children;
                if (
                  typeof code === 'string' &&
                  typeof className === 'string' &&
                  /^language-katex/.test(className.toLowerCase())
                ) {
                  const html = katex.renderToString(code, {
                    throwOnError: false,
                  });
                  return <code style={{ fontSize: '150%' }} dangerouslySetInnerHTML={{ __html: html }} />;
                }
                return <code className={String(className)}>{children}</code>;
              },
            }}
          />
        </div>
      </div>
      <button onClick={() => router.back()} className="mt-4 text-gray-500 hover:text-gray-300">Go Back</button>
    </div>
  );
};

export default JsonContentPage;
