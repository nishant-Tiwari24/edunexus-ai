'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/components/Responses/Loading';
import Error from '@/components/Responses/Error';

interface JsonContent {
  id: number;
  key: string;
  value: string;
  responseId: number;
}

const JsonContentPage: React.FC = () => {
  const [jsonContent, setJsonContent] = useState<JsonContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();

  const jsonContentId = params.jsoncontent;

  useEffect(() => {

    const fetchJsonContent = async () => {
      try {
        const res = await axios.get<JsonContent>(`/api/jsoncontent/${jsonContentId}`);
        console.log(jsonContentId)
        setJsonContent(res.data);
      } catch (err) {
        setError('Failed to fetch content');
      } finally {
        setLoading(false);
      }
    };

    fetchJsonContent();
  }, [jsonContentId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="bg-black p-36 border-zinc-600">
      <h2 className="text-xl text-center text-gray-500 font-medium mb-2">Content Details</h2>
      <div className="p-3 rounded-md text-zinc-200 relative overflow-hidden">
        {jsonContent && (
          <>
            <p className="text-3xl font-bold text-center mb-4">{jsonContent.key}</p>
            <p className="text-zinc-200">{jsonContent.value}</p>
          </>
        )}
      </div>
      <button onClick={() => router.back()} className="mt-4 text-gray-500 hover:text-gray-300">Go Back</button>
    </div>
  );
};

export default JsonContentPage;
