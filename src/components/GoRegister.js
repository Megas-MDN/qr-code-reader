'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useZusStore } from '@/store/store';

const GoRegister = ({ baseUrl }) => {
  const router = useRouter();
  const [token, setToken] = useZusStore((state) => [
    state.token,
    state.setToken,
  ]);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('host');
  const [pass, setPass] = useState('');
  const [passConfirm, setPassConfirm] = useState('');
  const [adress, setAdress] = useState({});
  const [cep, setCep] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [placeholder, setPlaceholder] = useState('user-email@email.com');

  const handleRegister = async () => {
    try {
      const res = await fetch(baseUrl + '/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          userName,
          password: pass,
          adress,
          role: type,
        }),
      });
      const data = await res.json();

      if (data.token) {
        setToken(data.token);
        router.push('/');
      }
      setUserName('');
      setEmail('');
      setPlaceholder('Email not allow');
      setPass('');
      setPassConfirm('');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const rgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (
      rgx.test(email) &&
      pass === passConfirm &&
      pass.length > 5 &&
      userName.length > 3 &&
      Object.keys(adress).length > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [userName, email, adress, passConfirm, pass]);

  const searchCep = async () => {
    setCep('Buscando...');
    try {
      const res = await fetch(
        `https://viacep.com.br/ws/${cep.replace('-', '')}/json`
      );
      const data = await res.json();
      if (data?.erro) return setCep('Cep não encontrado');
      setAdress({
        logradouro: data.logradouro,
        complemento: data.complemento,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
        cep: data.cep,
      });
      setCep(data.logradouro);
    } catch (error) {
      console.log(error);
      setCep('Erro ao buscar cep....');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-slate-700'>
      <div className='flex flex-col gap-3 w-95 p-6 shadow-md shadow-violet-400 bg-white rounded-sm text-black'>
        <h1 className='text-2xl block font-semibold'>Register</h1>
        <hr className='' />
        <label htmlFor='user' className='flex justify-between gap-1'>
          <p>User</p>
          <input
            onClick={() => setUserName('')}
            autoComplete='off'
            onChange={({ target: { value } }) => setUserName(value)}
            value={userName}
            type='text'
            id='user'
            placeholder='Username'
            className='placeholder-zinc-400 placeholder:italic border-b w-full text-base px-2 py-1 focus:outline-none'
          />
        </label>
        <label htmlFor='email' className='flex justify-between gap-1'>
          <p>Email</p>
          <input
            autoComplete='off'
            onChange={({ target: { value } }) => setEmail(value)}
            value={email}
            type='text'
            id='email'
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
        <label htmlFor='passConfirm' className='flex justify-between gap-1'>
          <p>Confirm</p>
          <input
            autoComplete='off'
            onChange={({ target: { value } }) => setPassConfirm(value)}
            value={passConfirm}
            type='password'
            id='passConfirm'
            placeholder='Confirm Password'
            className='placeholder-zinc-400 placeholder:italic border-b w-full text-base px-2 py-1 focus:outline-none'
          />
        </label>

        <label htmlFor='cep' className='flex justify-between gap-2'>
          <p>Cep</p>
          <input
            autoComplete='off'
            onChange={({ target: { value } }) => setCep(value)}
            value={cep}
            type='text'
            id='cep'
            placeholder='28907-410'
            className='placeholder-zinc-400 placeholder:italic border-b w-full text-base px-2 py-1 focus:outline-none'
          />
          <button
            onClick={searchCep}
            type='button'
            className='border rounded-md  hover:bg-slate-400 px-3 py-1  bg-slate-200'
          >
            Find
          </button>
        </label>
        <div className='flex justify-between'>
          <button
            onClick={() => {
              router.push('/login');
            }}
            type='button'
            className='border rounded-sm hover:bg-slate-400 px-3 py-1  bg-slate-200'
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            type='button'
            disabled={disabled}
            className='border rounded-sm hover:bg-slate-400 px-3 py-1 bg-slate-200 disabled:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:text-gray-400'
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoRegister;
