'use client';
import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { FaWindowClose } from 'react-icons/fa';

const Card = ({
  hash,
  name,
  description,
  _id,
  listHosts,
  qrcode: extQrCode,
  setQrcode: extSetQrCode,
  socket,
  userId,
  logs,
  user,
  removeProduct,
}) => {
  const [qrcode, setQrcode] = useState(false);
  const [menu, setMenu] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [host, setHost] = useState('');
  // const [select, setSelect] = useState('');

  const handleMenu = () => {
    if (host) {
      socket.emit('request-checkin', {
        prodId: _id,
        prodName: name,
        prodDescription: description,
        hostDestination: host,
        hostOrigin: userId,
      });
      setHost('');
    }
    setMenu(false);
  };

  useEffect(() => {
    if (!extQrCode) {
      setQrcode(false);
    }
  }, [extQrCode]);

  return (
    <div className='flex gap-1 max-w-[500px] w-full justify-center'>
      <QRCode
        value={hash}
        className='h-full shadow p-1'
        onClick={() => {
          setQrcode(true);
          extSetQrCode(true);
        }}
      />
      <div className='border border-slate-500-500 w-4/5 p-1 rounded-md shadow'>
        <div className='flex justify-between items-center p-1'>
          <h2 className='max-sm:max-w-[160px] max-sm:max-h-[30px] p-1 max-sm:overflow-y-auto no-scrollbar'>
            {name}
          </h2>
          <button
            onClick={() => setMenu((prev) => !prev)}
            type='button'
            className=' px-1 text-center hover:bg-slate-400 rounded-sm hover:text-white'
          >
            {menu ? (
              <FaWindowClose className='fa-solid fa-bars text-xl' />
            ) : (
              <i className='fa-solid fa-bars text-sm'></i>
            )}
          </button>
          {menu && (
            <div className='flex flex-col gap-2 justify-center'>
              <button
                onClick={handleMenu}
                className='border border-slate-500 self-center px-4 py-1 rounded-md'
              >
                Enviar
              </button>
              <select
                onChange={({ target: { value } }) => setHost(value)}
                value={host}
                className='text-white bg-slate-500 opacity-95 border-slate-500 flex flex-col left-[1rem] top-6 gap-1 w-[150px]'
              >
                <option
                  value=''
                  className='bg-slate-950 w-full p-1 bg-opacity-60 hover:bg-slate-400 hover:text-black'
                >
                  Select
                </option>
                {listHosts.map((hosty) => (
                  <option
                    className='bg-slate-950 w-full p-1 bg-opacity-60 hover:bg-slate-400 hover:text-black'
                    key={hosty._id}
                    value={hosty._id}
                  >
                    {hosty.userName}
                  </option>
                ))}
              </select>
              <button
                className='border border-slate-400 rounded-md bg-slate-200'
                onClick={() => setShowLogs((prev) => !prev)}
              >
                Logs
              </button>
              {showLogs &&
                logs.reverse().map((line, i) => (
                  <div key={line._id + i}>
                    <p>
                      From:{' '}
                      {listHosts.find((host) => host._id === line.origin)
                        ?.userName || user}
                    </p>
                    <p>
                      To:{' '}
                      {listHosts.find((host) => host._id === line.destination)
                        ?.userName || user}
                    </p>
                    <p>
                      Date:{' '}
                      {new Date(line.date).toLocaleString('pt-BR', {
                        timeZone: 'America/Sao_Paulo',
                      })}
                    </p>
                    <hr />
                  </div>
                ))}
              <button
                className='border border-slate-400 rounded-md bg-slate-200'
                onClick={() => removeProduct(_id)}
              >
                Excluir
              </button>
            </div>
          )}
        </div>
        <hr />
        <p className='text-[0.7rem] max-sm:max-h-[120px] max-sm:overflow-y-auto p-1 no-scrollbar'>
          {description}
        </p>
        <small className='text-sm text-[0.6rem]'>Id: {_id}</small>
      </div>
      {qrcode && (
        <div className='fixed inset-0 bg-white text-black bg-opacity-40 backdrop-blur-sm flex flex-col justify-center gap-5 items-center'>
          <button
            onClick={() => setQrcode(false)}
            type='button'
            className='ml-56 shadow border p-1 rounded-sm bg-slate-100'
          >
            <i className='fa-sharp fa-solid fa-rectangle-xmark text-3xl text-gray-700'></i>
          </button>
          <QRCode
            value={hash}
            className='shadow'
            onClick={() => setQrcode(false)}
          />
          <h4 className=' uppercase mt-2 w-screen p-1 text-center'>{name}</h4>
        </div>
      )}
    </div>
  );
};

export default Card;
