'use client';
import React, { useState, useEffect } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import MenuItem from './MenuItem';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface Subtopic {
  id: number;
  titles: string;
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const jsonContentId = params.jsoncontent;

  useEffect(() => {
    const fetchSubtopics = async () => {
      try {
        const res = await axios.get(`/api/jsoncontent/${jsonContentId}`);
        setSubtopics(res.data.subtopics);
      } catch (err) {
        setError('Failed to fetch subtopics');
      } finally {
        setLoading(false);
      }
    };

    fetchSubtopics();
  }, [jsonContentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={`relative flex flex-col bg-zinc-800 min-h-screen border-r-2 border-zinc-700 text-white h-full ${isOpen ? 'w-96' : 'w-20 pl-4 pr-4'} transition-width duration-300`}>
      <div className="mt-14 flex flex-col space-y-4 flex-grow">
        {subtopics.map((subtopic) => (
          <MenuItem key={subtopic.id} icon={FaChevronRight} text={subtopic.titles} isOpen={isOpen} />
        ))}
      </div>
      <div className="">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-2 mb-8 rounded bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        >
          {isOpen ? 'Close' : 'Open'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
