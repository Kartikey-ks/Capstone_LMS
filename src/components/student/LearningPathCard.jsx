import React from 'react';
import { Link } from 'react-router-dom';

const LearningPathCard = ({ roadmap }) => {
  return (
    <Link
      to={`/learning-path/${roadmap.slug}`}
      onClick={() => scrollTo(0, 0)}
      className="border rounded-lg overflow-hidden shadow-sm w-full max-w-sm bg-white hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
    >
      <div className="h-46 flex items-center justify-center overflow-hidden">
        <img src={roadmap.hero} className='h-full w-full object-contain' alt={roadmap.title} />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{roadmap.title}</h3>
        <p className="text-sm text-gray-500 mt-2">{roadmap.short}</p>
      </div>
    </Link>
  );
};

export default LearningPathCard;