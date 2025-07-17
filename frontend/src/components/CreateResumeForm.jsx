import React, { useState } from 'react'
import {Inputs} from './Inputs'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
// import axiosInstance from '../utils/axiosInstance';


function CreateResumeForm() {

  const [title, setTitle] = useState("");
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleCreateResume = async (e) => {
    e.preventDefault();
    if(!title){
      setError("Please enter a resume title")
      return;
    }
    setError("")
    try{
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE ,{
        title,
        
      })
      if(response.data?._id){
       
         navigate(`/resume/${response.data?._id}`)
        //  if (onClose) onClose();
          // console.log(navigate(`/resume/${response.data?._id}`))

      }
      

    }catch(error)
    {
      if(error.response && error.response.data.message){
        setError(error.response.data.message)
        // console.log("API response:", response.data);

      }
      else{
          setError('Something went wrong')

      }
        

    }
  }

  return (
    <div className='w-full max-w-md p8 bg-white rounded-2xl border border-gray-100 shadow-lg'>
      <h3 className='text-2xl font-bold text-gray-900 mb-2 '> Create New Resume</h3>
      <p className='text-gray-600 mb-8'>Give your resume a title to get started. You can customize later</p>
      <form onSubmit={handleCreateResume}>
        <Inputs value={title} onChange={(e) => setTitle(e.target.value)}
                label='Resume Title' placeholder='John Doe - Software Engineer'
                type='text'/>
        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
        <button type='submit' className='w-full py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-black rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-rose-200 transition-all '>
          Create Resume

        </button>

      </form>
      
    </div>
  )
}

export default CreateResumeForm
