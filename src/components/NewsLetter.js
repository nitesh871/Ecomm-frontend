import React from 'react'
import SendIcon from '@mui/icons-material/Send';

const NewsLetter = () => {
  return (
    <div className='bg-pink-100 flex items-center justify-center md:p-20 p-4 '>
        <div className='block text-gray-700'>
        <h1 className='text-5xl md:text-8xl text-center md:mt-0 mt-10  font-bold'>NewsLetter</h1>
        <h3 className='text-lg md:text-3xl md:p-10 p-4 text-center '>Get timely updates from your favorite products.</h3>
        <div className=' flex justify-center items-center md:mb-0 mb-10'>
            <input className='p-3 md:w-[80vh] w-[60%] border border-gray-400' placeholder='Your email'></input>
            <button className='bg-green-700 p-3 md:w-20 w-16  text-white'><SendIcon /></button>
        </div>
        </div>
    </div>
  )
}

export default NewsLetter