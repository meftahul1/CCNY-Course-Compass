"use client";
import React, { useState } from 'react'
// import { Auth } from "../api/AuthAPI/Auth"

const Login = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        const data = await response.json();
        console.log('User ID:', data.userID);
        // Handle successful login (e.g., redirect to dashboard)
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };
  

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">CCNY Course Compass</h2>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign In</h2>
            <p className="text-center text-1xl leading-9 tracking-tight text-gray-900">Enter credentials to log in</p>
          </div>
    

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {error && <p className='text-center text-red-500'>{error}</p>}
            <form className="space-y-6" onSubmit={handleSubmit} > {/* onSubmit={} */}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div className="mt-2">
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    autoComplete="email" 
                    required className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder='email@domain.com'
                    onChange={(e) => setEmail(e.target.value)}
                     />
                </div>
              </div>
    
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                </div>
                <div className="mt-2">
                  <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
    
              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log In</button>
              </div>
            </form>
    
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?&nbsp;
              <a href="/create-account" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign Up Today</a>
            </p>
          </div>
        </div>
      );
}

export default Login