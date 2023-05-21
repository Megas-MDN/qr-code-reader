'use client';
import { useZusStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Transfer from './Transfer';
import Host from './Host';

const Hero = ({ baseUrl }) => {
  const router = useRouter();
  const [listHosts, setListHosts] = useState([]);
  const [roleState, setRoleState] = useState('');
  const [user, setUser] = useState('');
  const [token, role, setRole, setToken, setUserId, userName, setUserName] =
    useZusStore((state) => [
      state.token,
      state.role,
      state.setRole,
      state.setToken,
      state.setUserId,
      state.userName,
      state.setUserName,
    ]);

  const fetchAllHost = async () => {
    const res = await fetch(baseUrl + '/host/all', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    const data = await res.json();
    setListHosts(data);
  };

  const fetchRole = async (tkn) => {
    if (!tkn) return router.push('/login');
    try {
      const res = await fetch(baseUrl + '/role', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: tkn,
        },
      });
      const data = await res.json();

      if (!data?.role) {
        setToken('');
        setUserId('');
        return router.push('/login');
      }

      setRole(data.role);
      setUserId(data._id);
      setUserName(data.userName);
      fetchAllHost();
    } catch (error) {
      console.log(error.message);
      return router.push('/login');
    }
  };

  useEffect(() => {
    fetchRole(token);
  }, []);

  useEffect(() => {
    if (role === 'transfer') {
      setRoleState('transfer');
    } else if (role === 'host') {
      setRoleState('host');
    } else {
      setRoleState('');
    }
  }, [role]);

  useEffect(() => {
    setUser(userName);
  }, [userName]);

  return (
    <>
      <header className=' sticky p-3 shadow w-screen flex justify-between'>
        <h1 className='p-1 hover:scale-125'>
          {user ? user.toLocaleUpperCase() : 'Loading...'}
        </h1>
        <button
          onClick={() => {
            setToken('');
            setUserId('');
            router.push('/login');
          }}
          type='button'
          className='border border-slate-400 px-2 py-1 rounded-md hover:bg-slate-500 hover:text-white'
        >
          Logout
        </button>
      </header>
      <main className='flex-1 w-screen flex flex-col items-center max-w-[1000px] mx-auto h-[90%]'>
        {roleState === 'host' && (
          <Host {...{ token, baseUrl, listHosts, user }} />
        )}
        {roleState === 'transfer' && (
          <Transfer {...{ token, baseUrl, listHosts }} />
        )}
      </main>
      <footer className='w-screen p-3 border fixed bg-white bottom-0 shadow'>
        CopyRight
      </footer>
    </>
  );
};

export default Hero;
