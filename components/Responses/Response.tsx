'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Loading from './Loading';
import Error from './Error';
import RoadmapBox from './RoadmapBox';
import { renderTitle } from './RenderTitle';
import { v4 as uuidv4 } from 'uuid';

interface ChatGptResponse {
  id: number;
  title: string;
  content: Record<string, string>;
  createdAt: string;
}

const RoadmapPage: React.FC = () => {
  const [response, setResponse] = useState<ChatGptResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const responseId = params.responses;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get<ChatGptResponse>(`/api/responses?responseId=${responseId}`);
        setResponse(res.data);
      } catch (err) {
        setError('Failed to fetch roadmap details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [responseId]);

  const handleBoxClick = (key: string) => {
    alert(`Details for ${key}: ${response?.content[key]}`);
  };

  const renderContent = (content: Record<string, string>) => {
    return Object.entries(content).map(([key, value], index) => {
      const isLast = index === Object.entries(content).length - 1;
      const isThird = (index + 1) % 3 === 0;
      const uniqueId = uuidv4();
      return (
        <RoadmapBox
          id={uniqueId}
          keyText={key}
          valueText={value}
          isLast={isLast}
          isThird={isThird}
          key={uniqueId}
          onClick={() => handleBoxClick(key)} // Add onClick handler
        />
      );
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="bg-black p-36 border-zinc-600">
      <h2 className="text-xl text-center text-gray-500 font-medium mb-2">Roadmap Details</h2>
      <div className="p-3 rounded-md text-zinc-200 relative overflow-hidden">
        {response && <p className="text-3xl font-bold text-center mb-4">{renderTitle(response.title)}</p>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {response && renderContent(response.content)}
        </div>
        <p className="text-zinc-400 text-sm mt-4">
          {response && new Date(response.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default RoadmapPage;
