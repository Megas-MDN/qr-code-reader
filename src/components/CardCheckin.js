import React from 'react';

const CardCheckin = ({
  setModalCheckin,
  baseUrl,
  token,
  listHosts,
  host,
  handleCheckinAnswer,
  hostDestination,
  hostOrigin,
  prodDescription,
  prodId,
  prodName,
}) => {
  return (
    <div className='border border-slate-300 mx-auto flex flex-col gap-1 w-[350px] py-3 px-1 mt-2 shadow'>
      <p className='text-xl text-center'>Product :: {prodName}</p>
      <p className='text-center italic'>Check in from</p>
      <p className='text-xl text-center'>
        Host ::{' '}
        {listHosts.find((theHost) => theHost._id === hostOrigin)?.userName}
      </p>
      <div className='flex justify-around py-2 px-1 '>
        <button
          className='text-xl border border-slate-500 px-2 py-1 rounded-md bg-red-600 bg-opacity-50 text-white'
          onClick={() => {
            setModalCheckin(false);
            handleCheckinAnswer({
              answer: 'decline',
              prodId,
              origin: hostOrigin,
            });
          }}
        >
          Decline
        </button>
        <button
          className='text-xl border border-slate-500 px-2 py-1 rounded-md bg-green-600 bg-opacity-50'
          onClick={() => {
            setModalCheckin(false);
            handleCheckinAnswer({
              answer: 'accept',
              prodId,
              origin: hostOrigin,
            });
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CardCheckin;
