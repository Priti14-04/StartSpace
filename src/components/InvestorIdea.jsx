import React from 'react';
import { Link } from 'react-router-dom';

function InvestorIdea({ title, author, updatedAt, publishedAt, category, status, slug }) {
  return (
    <div className="border p-4 my-2 rounded shadow relative">
      <h2 className="text-xl font-bold relative">
        {status !== "published" && (
          <span className='absolute top-2 right-4 bg-yellow-200 text-yellow-700 text-sm font-semibold px-2 py-1 rounded-md'>
            {status}
          </span>
        )}
        {title}
      </h2>

      <div className='flex items-center gap-4 my-4'>
        <span className='font-semibold w-12 h-12 flex items-center justify-center rounded-full bg-orange-300 text-white text-xl'>
          {author.name.substring(0,1)}
        </span>
        <div>
          <p className='font-medium'>{author.name}</p>
          <p className='text-sm text-gray-600'>{author.email}</p>
        </div>
      </div>

      <p className='text-sm text-gray-500'>
        Published On: {new Date(publishedAt || updatedAt).toLocaleString()}
      </p>

      <span className='absolute top-2 left-2 bg-gray-200 text-gray-700 px-2 py-1 rounded-b-lg text-sm'>
        {category}
      </span>

      <Link 
        className="bg-gray-700 text-white px-6 py-2 rounded-md absolute bottom-4 right-4 cursor-pointer"
        to={status === "published" ? `/idea/${slug}` : `/edit/${slug}`}
      >
        {status === "published" ? "Read More" : "Edit Idea"}
      </Link>
    </div>
  );
}

export default InvestorIdea;
