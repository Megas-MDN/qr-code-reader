'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useZusStore } from '@/store/store';
import Loading from '@/Loading';

const GoLogin = ({ baseUrl }) => {
  const [setToken, token] = useZusStore((state) => [
    state.setToken,
    state.token,
  ]);
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [placeholder, setPlaceholder] = useState('user-email@email.com');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const rgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (rgx.test(userName) && pass.length > 5) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [userName, pass]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch(baseUrl + '/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userName, password: pass }),
      });
      const data = await res.json();
      if (data?.token) {
        setToken(data.token);
        router.push('/');
      }
      setUserName('');
      setPlaceholder('Email or Password invalid');
      setPass('');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(true);
    }
  };

  const setUser = (userEmail) => {
    setUserName(userEmail);
    setPass('123pinTuff');
  };

  return (
    <div className='flex justify-center items-center h-screen bg-slate-700'>
      <div className='flex flex-col gap-3 w-95 p-6 shadow-md shadow-violet-400 bg-white rounded-sm text-black'>
        <div className='header-container flex items-center justify-between p-1'>
          <h1 className='text-2xl block font-semibold'>Login</h1>
          <div className='btn-container flex gap-2 p-1'>
            <button
              type='button'
              className='btn px-3 py-1 rounded bg-green-500 bg-opacity-10'
              onClick={() => setUser('megas-d-host@teste.com')}
            >
              User tester 1
            </button>
            <button
              type='button'
              className='btn px-3 py-1 rounded bg-blue-700 bg-opacity-10'
              onClick={() => setUser('megas-d-host2@teste.com')}
            >
              User tester 2
            </button>
          </div>
        </div>
        <hr className='' />
        <label htmlFor='user' className='flex justify-between gap-1'>
          <p>Email</p>
          <input
            autoComplete='off'
            onChange={({ target: { value } }) => setUserName(value)}
            value={userName}
            type='text'
            id='user'
            placeholder={placeholder}
            className='placeholder-zinc-400 placeholder:italic border-b w-full text-base px-2 py-1 focus:outline-none'
          />
        </label>
        <label htmlFor='pass' className='flex justify-between gap-1'>
          <p>Password</p>
          <input
            autoComplete='off'
            onChange={({ target: { value } }) => setPass(value)}
            value={pass}
            type='password'
            id='pass'
            placeholder='Password'
            className='placeholder-zinc-400 placeholder:italic border-b w-full text-base px-2 py-1 focus:outline-none'
          />
        </label>
        {!loading && (
          <div className='flex justify-end'>
            {false && ( // Disabled register function
              <button
                onClick={() => {
                  router.push('/register');
                }}
                type='button'
                className='border rounded-sm hover:bg-slate-400 px-3 py-1  bg-slate-200'
              >
                Register
              </button>
            )}
            <button
              onClick={handleLogin}
              disabled={disabled}
              type='submit'
              className='border rounded-sm hover:bg-slate-400 px-3 py-1 bg-slate-200 disabled:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed  disabled:text-gray-400'
            >
              Login
            </button>
          </div>
        )}
        {loading && <Loading />}
      </div>
    </div>
  );
};

export default GoLogin;
