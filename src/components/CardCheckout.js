import React from 'react';

const CardCheckout = ({
  setModalCheckout,
  baseUrl,
  token,
  idProd,
  idDestination,
  listHosts,
  host,
  origin,
  hostDestination,
  hostOrigin,
  prodId,
  handleCheckoutAnswer,
}) => {
  return (
    <div className='border border-slate-300 mx-auto flex flex-col gap-1 w-[350px] py-3 px-1 mt-2 shadow'>
      <p className='text-xl text-center'>
        Product :: {host.find((prod) => prod._id === idProd).name}
      </p>
      <p className='text-center italic'>Check out to</p>
      <p className='text-xl text-center'>
        Host :: {listHosts.find((theHost) => theHost._id === origin).userName}
      </p>
      <div className='flex justify-around py-2 px-1 '>
        <button
          className='text-xl border border-slate-500 px-2 py-1 rounded-md bg-red-600 bg-opacity-50 text-white'
          onClick={() => {
            setModalCheckout(false);
            handleCheckoutAnswer({ answer: 'decline', prodId: idProd, origin });
          }}
        >
          Decline
        </button>
        <button
          className='text-xl border border-slate-500 px-2 py-1 rounded-md bg-green-600 bg-opacity-50'
          onClick={() => {
            setModalCheckout(false);
            handleCheckoutAnswer({ answer: 'accept', prodId: idProd, origin });
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CardCheckout;
