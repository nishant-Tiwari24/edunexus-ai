'use client'
import { useState } from 'react';
import { useSession } from 'next-auth/react';

const RoadmapForm = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    syllabus: '',
    learningObj: '',
    refResources: '',
    prerequisites: '',
    duration: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      alert('You must be logged in to submit a roadmap.');
      return;
    }

    try {
      const response = await fetch('/api/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit roadmap');
      }

      const data = await response.json();
      alert('Roadmap generated and saved!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting roadmap');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="syllabus">Syllabus:</label>
        <textarea
          id="syllabus"
          name="syllabus"
          value={formData.syllabus}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="learningObj">Learning Objectives:</label>
        <textarea
          id="learningObj"
          name="learningObj"
          value={formData.learningObj}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="refResources">Reference Resources:</label>
        <textarea
          id="refResources"
          name="refResources"
          value={formData.refResources}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="prerequisites">Prerequisites:</label>
        <textarea
          id="prerequisites"
          name="prerequisites"
          value={formData.prerequisites}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="duration">Duration:</label>
        <textarea
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Generate
      </button>
    </form>
  );
};

export default RoadmapForm;
