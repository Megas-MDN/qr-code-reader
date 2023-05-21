'use client';
import { useZusStore } from '@/store/store';
import React, { useState } from 'react';
import { FiPackage } from 'react-icons/fi';
import { v4 } from 'uuid';

const ProductCard = ({ setAddProd, baseUrl }) => {
  const token = useZusStore((state) => state.token);
  const [name, setName] = useState('');
  const [description, setSescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hash = v4();
    const res = await fetch(baseUrl + '/product', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ hash, name, description }),
    });
    const data = await res.json();
    console.log(data);
    setAddProd(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col border border-slate-400 items-center justify-center m-auto gap-3 p-3 w-80 rounded-lg bg-white bg-opacity-60'
    >
      <h1 className='text-2xl self-start flex justify-between w-full items-center'>
        Novo produto
        <FiPackage />
      </h1>
      <hr className='border border-slate-200 w-full' />
      <label
        htmlFor=''
        className='flex gap-1 justify-between items-center w-full'
      >
        Nome:
        <input
          value={name}
          onChange={({ target: { value } }) => setName(value)}
          type='text'
          placeholder='do produto'
          className='flex-1 border-b border-slate-400 outline-none p-1 bg-slate-100'
        />
      </label>
      <label htmlFor='' className='flex align-top gap-1 justify-between w-full'>
        Descrição:
        <textarea
          onChange={({ target: { value } }) => setSescription(value)}
          value={description}
          type='text'
          placeholder='do produto'
          className='bg-slate-100 flex-1 resize-none border p-1 border-slate-400 outline-none'
        />
      </label>
      <div className='flex justify-between w-full p-1'>
        <button
          onClick={() => setAddProd(false)}
          type='button'
          className='border bg-white shadow border-slate-400 px-2 py-1 rounded-md hover:bg-slate-700 hover:text-white'
        >
          Cancelar
        </button>
        <button
          type='submit'
          className='border bg-white shadow border-slate-400 px-2 py-1 rounded-md hover:bg-slate-700 hover:text-white'
        >
          Criar
        </button>
      </div>
    </form>
  );
};

export default ProductCard;
