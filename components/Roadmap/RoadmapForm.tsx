// components/RoadmapForm.tsx
'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import InputField from './InputField';
import Button from './Button';
import { toast, ToastBar } from 'react-hot-toast';

const RoadmapForm = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    syllabus: '',
    learningObj: '',
    refResources: '',
    prerequisites: '',
    duration: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      toast.success('Roadmap generated and saved!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error submitting roadmap');
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-4 bg-black p-10 border-zinc-600 border-2 rounded-2xl">
      <InputField
        label="Syllabus"
        id="syllabus"
        name="syllabus"
        value={formData.syllabus}
        onChange={handleChange}
      />
      <InputField
        label="Learning Objectives"
        id="learningObj"
        name="learningObj"
        value={formData.learningObj}
        onChange={handleChange}
      />
      <InputField
        label="Reference Resources"
        id="refResources"
        name="refResources"
        value={formData.refResources}
        onChange={handleChange}
      />
      <InputField
        label="Prerequisites"
        id="prerequisites"
        name="prerequisites"
        value={formData.prerequisites}
        onChange={handleChange}
      />
      <InputField
        label="Duration"
        id="duration"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
      />
      <Button label='Generate Roadmap'/>
    </form>
    </>
  );
};

export default RoadmapForm;
