import React from 'react'

const Feed = () => {
  return (
    <>
      <div className='w-full flex-center flex-col'>
        <h3 className='semi_text'>Members</h3>
        <h1 className='text-xl mx-auto my-4 blue_gradient'>Featuring</h1>

        <div className='grid mt-10 grid-cols-2 lg:grid-cols-3 gap-20'>
          <div className='p-6 hover:scale-105 ease-in duration-300'>
            <div className='flex flex-col items-center justify-center'>
              <h3 className='mt-4 font-bold text-center'>Courses</h3>
              <p className='text-gray-500 text-sm text-center hidden sm:block'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
            <div className='p-6 hover:scale-105 ease-in duration-300'>
              <div className='flex flex-col items-center justify-center'>
                <h3 className='mt-4 font-bold text-center'>Chat</h3>
                <p className='text-gray-500 text-sm text-center hidden sm:block'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div className='p-6 hover:scale-105 ease-in duration-300'>
              <div className='flex flex-col items-center justify-center'>
                <h3 className='mt-4 font-bold text-center'>Professor Ratings</h3>
                <p className='text-gray-500 text-sm text-center hidden sm:block'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div className='p-6 hover:scale-105 ease-in duration-300'>
              <div className='flex flex-col items-center justify-center'>
                <h3 className='mt-4 font-bold text-center'>Course Ratings</h3>
                <p className='text-gray-500 text-sm text-center hidden sm:block'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div className='p-6 hover:scale-105 ease-in duration-300'>
              <div className='flex flex-col items-center justify-center'>
                <h3 className='mt-4 font-bold text-center'>Textbooks</h3>
                <p className='text-gray-500 text-sm text-center hidden sm:block'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div className='p-6 hover:scale-105 ease-in duration-300'>
              <div className='flex flex-col items-center justify-center'>
                <h3 className='mt-4 font-bold text-center'>Courses</h3>
                <p className='text-gray-500 text-sm text-center hidden sm:block'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>


          <footer className='w-full mt-20 p-4 text-black text-center'>
          <p>© 2024 Course Compass. All rights reserved.</p>
          <div className='flex justify-center space-x-4 mt-2'>
            <a href='#' className='hover:text-gray-400'>Privacy Policy</a>
            <a href='#' className='hover:text-gray-400'>Terms of Service</a>
            <a href='#' className='hover:text-gray-400'>Contact</a>
          </div>
        </footer>
        
      </div>
   </>
  )
}

export default Feed


