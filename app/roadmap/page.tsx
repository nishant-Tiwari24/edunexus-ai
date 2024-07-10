import RoadmapForm from '@/components/Roadmap/RoadmapForm'
import React from 'react'
import History from '@/components/Roadmap/History'

const page = () => {
  return (
    <div>
      <div className="container mx-auto p-4">
<h1 className="text-2xl font-bold mb-4">AI Roadmap Generator</h1>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <RoadmapForm />
  </div>
  <div>
    <History />
  </div>
</div>
</div>
    </div>
  )
}

export default page
