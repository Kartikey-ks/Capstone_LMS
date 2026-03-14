import React from 'react';
import { Link } from 'react-router-dom';
import LearningPathCard from './LearningPathCard';
import roadmaps from '../../assets/roadmapsData';

const LearningPath = ({ featuredCount = 3 }) => {
  const featured = roadmaps.slice(0, featuredCount);

  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Learning Paths</h2>
            <p className="text-gray-500">Pick a roadmap and follow a guided path.</p>
          </div>

          <Link
            to="/roadmap"
            className="text-sm px-4 py-2 border rounded-lg hover:bg-gray-800 hover:text-white transition"
            onClick={() => scrollTo(0, 0)}
          >
            Explore more
          </Link>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(r => (
            <LearningPathCard key={r.slug} roadmap={r} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPath;