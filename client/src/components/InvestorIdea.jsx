import React from 'react';
import {Link} from "react-router"

function InvestorIdea({
  title,
  author,
  updatedAt,
  publishedAt,
  category,
  status,
  slug
}) {
  return (
    <div className="border p-4 my-2 rounded shadow relative">
      <h2 className="text-xl font-bold">
         {
          status !="published" ?(
            <span className='absolute top-2 right-35 bg-yellow-200 text-yellow-700 text-xl
             font-semibold px-2 py-1 rounded-md mr-4'>
              {status}
            </span>
          ) :null}
     
        
        {title}</h2>
      <div>
     
        <div className='flex items-center gap-4 my-4'>
        <span className='font-semibold w-[50px] flex items-center text-white justify-center rounded-full h-[50px] text-3xl bg-orange-300 text-center'>{author.name.substring(0,1)}
            </span>{""}
       
      <div>
      <p>{author.name}</p>
      <p>{author.email}</p>
      </div>
      </div>
      </div>
      <p className='text-sm '>Published On: {new Date(publishedAt || updatedAt).toLocaleString()}</p>

      <span className='absolute top-2 right-2 bg-gray-200 text-gray-700 px-2 py-1 rounded-b-lg'>
        {category}</span>
        
          {status =="published" ? (
       
       
           <Link 
            className="bg-gray-700 text-white px-6 py-2 rounded-md absolute bottom-4 right-4 cursor-pointer" 
            type="button" to={`/idea/${slug}`}
           
          >
            Read More
          </Link>
          ):(
             <Link 
            className="bg-gray-700 text-white px-6 py-2 rounded-md absolute bottom-4 right-4 cursor-pointer" 
            type="button" to={`/edit/${slug}`}
           
          >
            Edit idea
          </Link>
          )}
     
    </div>
  );
}

export default InvestorIdea;
