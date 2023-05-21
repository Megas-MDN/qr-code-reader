// generate.js
'use client';
import React, { useState } from 'react';
import QRCode from 'react-qr-code';

function Generate() {
  const [qrCodeValue, setQrCodeValue] = useState('');

  return (
    <div className='container card rounded-none bg-white flex gap-5 pt-11 pb-6 justify-center flex-col items-center'>
      {qrCodeValue != '' && <QRCode value={qrCodeValue} className='' />}
      <input
        className='border border-black rounded-md p-2 shadow-sm focus:outline-none sm:text-sm focus:border-zinc-400 focus:ring-zinc-500 focus:ring-1 text-black'
        onChange={(e) => {
          setQrCodeValue(e.target.value);
        }}
      />
    </div>
  );
}

export default Generate;
