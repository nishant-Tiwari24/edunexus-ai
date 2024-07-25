'use client';
import React, { useState, useEffect } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import MenuItem from './MenuItem';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useRouter } from 'next/navigation';

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
  const responseId = params.responses;
  const router = useRouter();

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

  const handleMenuItemClick = async (subtopicId: number) => {
    try {
      router.push(`/roadmap/${responseId}/${jsonContentId}/${subtopicId}`);
      await axios.post(`/api/content/${subtopicId}`);
      
    } catch (err) {
      setError('Failed to generate content');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
<div className={`fixed flex flex-col bg-gradient-to-br from-black to-zinc-800 min-h-screen border-r-2 border-zinc-800  h-full ${isOpen ? 'w-96' : 'w-20'} transition-width duration-300 ease-in-out`}>
      <div className={`flex-shrink-0 p-4 flex items-center ${isOpen ? 'justify-between' : 'justify-center'}`}>
        {isOpen && <h1 className="text-2xl px-2 font-semibold text-white">Let's Conquer This Level 🔥</h1>}
      </div>
      <hr className='bg-white'/>
      <div className="mt-8 flex flex-col space-y-2 flex-grow px-2">
        {subtopics.map((subtopic) => (
          <MenuItem 
            onClick={() => handleMenuItemClick(subtopic.id)} 
            key={subtopic.id} 
            icon={FaChevronRight} 
            text={subtopic.titles} 
            isOpen={isOpen} 
          />
        ))}
      </div>
      <div className="px-4 mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full rounded transition duration-300 py-2 ease-in-out ${
            isOpen ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600' : 'bg-gray-600 hover:bg-gray-500'
          }`}
        >
          {isOpen ? 'Close' : 'Open'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
