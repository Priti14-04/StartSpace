import { useState } from 'react'
import MarkdownEditor from '@uiw/react-markdown-editor';
import { IDEA_CATEGORIES } from '../constants';
import { useEffect } from 'react';
import axios from "axios"
import { getCurrentUser } from '../util';
import toast ,{Toaster} from "react-hot-toast";


function NewIdea() {

   const[content,setContent] = useState("");
   const [title,setTitle] = useState("");
   const[category,setCategory]=useState(IDEA_CATEGORIES[0]);
   const[user,setUser] = useState(null);

    useEffect(() =>{
      document.documentElement.setAttribute("data-color-mode" , "light");
      setUser(getCurrentUser())
    },[]);

    const saveIdea = async()=>{
     const response = await axios.post(`${import.meta.env.VITE_API_URL}/idea`,{
        title,
        content,
        category,
        author:user?._id
      });

      if(response?.data?.success){
        toast.success("Idea Saved Successfully");
        setTimeout(()=>{
          window.location.href="/";
        },2000);
        
      };

    };

  return (
    <div className='container mx-auto p-4'>
      <h1>New Idea</h1>

      <input
       type="text"  
       placeholder='Idea Title'
        className='border p-3 w-full my-4'
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
        />
        <select value ={category} onChange={(e) => setCategory(e.target.value)} className='border p-2 my-4'> 
          {IDEA_CATEGORIES.map((cate)=>{
            return(
              <option key={cate}  value={cate}>
                {cate}
              </option>
            );
          })}
        </select>

      <MarkdownEditor
      value={content}
      height='500px'
      onChange={(value) => {
        setContent(value);
      }}
    />
  <button className='bg-blue-500 text-white px-4 py-2 mt-4 rounded cursor-pointer' type="button"
  onClick={saveIdea}>Save Idea </button>

  <Toaster/>
    </div>
  )
}

export default NewIdea
