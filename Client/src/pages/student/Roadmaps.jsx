import React from 'react';
import roadmaps from '../../assets/roadmapsData';
import LearningPathCard from '../../components/student/LearningPathCard';

const Roadmaps = () => {
  return (
    <div className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">All Roadmaps</h1>
        <p className="text-gray-500 mb-8">Choose a path to explore detailed topics and steps.</p>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {roadmaps.map(r => (
            <LearningPathCard key={r.slug} roadmap={r} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmaps;