'use client';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Card from './Card';
import { BsQrCodeScan, BsFillBellFill } from 'react-icons/bs';
import { MdCameraswitch } from 'react-icons/md';
import {
  AiOutlinePlus,
  AiFillCloseSquare,
  AiOutlineCamera,
} from 'react-icons/ai';
import QrReader from 'react-qr-reader';
import QRCode from 'react-qr-code';
import { useRouter } from 'next/navigation';
import { useZusStore } from '@/store/store';
import ProductCard from './ProductCard';
import CardCheckout from './CardCheckout';
import CardCheckin from './CardCheckin';

const Host = ({ token, baseUrl, listHosts, user }) => {
  const userId = useZusStore((state) => state._id);
  const setToken = useZusStore((state) => state.setToken);
  const setUserId = useZusStore((state) => state.setUserId);
  const router = useRouter();
  const [host, setHost] = useState([]);
  const [reader, setReader] = useState(false);
  const [modal, setModal] = useState(false);
  const [addProd, setAddProd] = useState(false);
  const [send, setSend] = useState(false);
  const [qrcode, setQrcode] = useState(false);
  const [modalCheckout, setModalCheckout] = useState(false);
  const [modalCheckin, setModalCheckin] = useState(false);
  const [checkoutContainer, setCheckoutContainer] = useState([]);
  const [checkinContainer, setCheckinContainer] = useState([]);
  const [webScan, setWebScan] = useState('No result...');
  const [answer, setAnswer] = useState('');
  const [search, setSearch] = useState('');
  const [cam, setCam] = useState('environment');
  const [prodScann, setProdScann] = useState({});
  const [socket, setSocket] = useState({
    on: () => null,
    id: null,
    emit: () => null,
  });

  const handleScan = (scan) => {
    if (scan) {
      setWebScan(scan);
      setReader(false);
      fetchProductById(scan);
    }
  };

  const handleError = (err) => {
    if (err) console.log(err);
  };

  const fetchData = async () => {
    if (!token) return router.push('/login');
    try {
      const res = await fetch(baseUrl + '/host', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const data = await res.json();

      if (data?.message) {
        setToken('');
        setUserId('');
        return router.push('/login');
      }
      if (!data.inventory) throw new Error('Inventario nao encontrado');
      setReader(false);
      setModal(false);
      setAddProd(false);
      setSend(false);
      setQrcode(false);
      setModalCheckout(false);
      setModalCheckin(false);

      setHost(data.inventory);
    } catch (error) {
      console.log(error);
      setHost([]);
    }
  };

  const fetchProductById = async (id) => {
    try {
      const res = await fetch(baseUrl + '/product/' + id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const data = await res.json();
      if (!data?.hash) return setModal(false);
      setProdScann(data);
    } catch (error) {
      console.log(error);
      setProdScann({});
    }
  };

  const removeProduct = async (id) => {
    try {
      console.log(id, userId);
      const res = await fetch(baseUrl + '/product/' + id + '/' + userId, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const data = await res.json();
      console.log(data);
      fetchData();
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
    setSocket(io(baseUrl));
    console.log(baseUrl);
    return () => {
      socket.emit('disconnect', () => {
        console.log(socket.id, 'Exit'); // undefined
      });
    };
  }, []);

  useEffect(() => {
    socket.on(`re-fetch-${userId}`, () => {
      fetchData();
    });

    socket.on('message-' + userId, (payload) => {
      setQrcode(false);
      setModalCheckout(true);
      setCheckoutContainer((prev) => {
        prev.push(payload);
        return prev;
      });
    });

    socket.on('answer-checkout-' + userId, (payload) => {
      setAnswer(payload.answer);
    });

    socket.on('answer-checkin-' + userId, (payload) => {
      // console.log(payload); // refresh the page
    });

    socket.on('request-checkin-' + userId, (payload) => {
      // console.log(payload);
      setModalCheckin(true);
      setCheckinContainer((prev) => [...prev, payload]);
    });
  }, [socket]);

  const handleCreateProd = () => {
    setAddProd(false);
    fetchData();
  };

  const handleCheckIn = () => {
    setSend(true);
    socket.emit(`message-qr-product`, {
      idProd: prodScann._id,
      idDestination: prodScann.destination._id,
      origin: userId,
    });
  };

  const handleCheckoutAnswer = ({ answer, prodId, origin }) => {
    socket.emit('answer-checkout', {
      answer,
      host: userId,
      hostRequest: origin,
      prodId,
    });
    const newCkout = checkoutContainer.filter((prod) => prod.idProd !== prodId);
    setCheckoutContainer(newCkout);
  };

  const handleCheckinAnswer = ({ answer, prodId, origin }) => {
    socket.emit('answer-checkin', {
      answer,
      host: userId,
      hostRequest: origin,
      prodId,
    });
    const newCkin = checkinContainer.filter((prod) => prod.prodId !== prodId);
    setCheckinContainer(newCkin);
  };

  return (
    <section className='flex flex-col items-center w-full h-full'>
      <div className=' w-full w-max-[500px] flex justify-center gap-2 py-2 px-4'>
        <input
          value={search}
          onChange={({ target: { value } }) => setSearch(value)}
          type='text'
          className='px-2 rounded-md shadow focus:outline-none placeholder-gray-400'
          placeholder={'Search Product'}
        />
        <button
          onClick={() => {
            setModal(true);
            setReader(true);
            setProdScann({});
          }}
          type='button'
          className='bg-white bg-opacity-30 rounded-md p-2 shadow-md border hover:text-white hover:bg-slate-400'
        >
          <BsQrCodeScan size={'30px'} className='' />
        </button>
        <button onClick={() => setAddProd(true)} type='button' className=''>
          <AiOutlinePlus
            size={'40px'}
            className='shadow rounded-full p-1 border border-slate-300 text-black hover:text-white hover:bg-slate-400'
          />
        </button>
      </div>
      {addProd && (
        <div className='fixed inset-0 bg-white text-black bg-opacity-20 backdrop-blur-sm flex flex-col justify-center gap-5 items-center h-screen w-screen'>
          <ProductCard {...{ setAddProd: handleCreateProd, baseUrl }} />
        </div>
      )}
      <hr />
      {modal && (
        <div className='fixed inset-0 bg-white text-black bg-opacity-20 backdrop-blur-sm flex flex-col justify-center gap-5 items-center'>
          <div className='flex justify-around w-full mx-auto max-w-[600px] bg-white bg-opacity-60 shadow'>
            <button
              type='button'
              className='text-3xl border border-slate-200 shadow px-2 py-1 rounded-md my-2 mr-3 self-end md:self-center'
              onClick={() => {
                !reader
                  ? setReader(true)
                  : setCam(cam === 'user' ? 'environment' : 'user');
                setSend(false);
                setAnswer('');
              }}
            >
              {reader ? <MdCameraswitch /> : <AiOutlineCamera />}
            </button>
            <button
              type='button'
              className='text-3xl border border-slate-200 shadow px-2 py-1 rounded-md my-2 mr-3 self-end md:self-center'
              onClick={() => {
                setModal(false);
                setSend(false);
                setAnswer('');
              }}
            >
              <AiFillCloseSquare />
            </button>
          </div>
          {reader && (
            <QrReader
              delay={500}
              onError={handleError}
              onScan={handleScan}
              legacyMode={false}
              facingMode={cam || 'environment'} // environment
              className='w-full p-1 shadow-lg'
              style={{ maxWidth: '600px' }}
            />
          )}
          {!reader && (
            <>
              {Object.keys(prodScann).length === 0 ? (
                <div>Loading...</div>
              ) : (
                <div className='flex gap-2 shadow p-1 bg-white bg-opacity-70'>
                  {send ? (
                    <div className='border border-slate-700 p-1'>
                      <h1 className='text-2xl text-center'>Message sender</h1>
                      <p className=' italic text-lg p-1 text-slate-800'>
                        Wait the Host acept this checkout request.
                      </p>
                      <p>
                        {answer
                          ? `The Host ${answer.toUpperCase()} your request.`
                          : ''}
                      </p>
                    </div>
                  ) : (
                    <>
                      <QRCode
                        value={prodScann.hash}
                        className='shadow h-full p-1 w-2/6'
                      />
                      <div className='flex flex-col justify-between'>
                        <h2 className='text-2xl uppercase'>{prodScann.name}</h2>
                        <hr />
                        <p className='text-sm'>
                          Pessoa em posse:{' '}
                          <em>{prodScann?.destination?.userName}</em>
                        </p>
                        <p className='text-sm'>
                          Local:{' '}
                          <em>{prodScann?.destination?.adress?.logradouro}</em>
                        </p>
                        <button
                          onClick={handleCheckIn}
                          disabled={host.some(
                            (item) => item._id === prodScann?._id
                          )}
                          type='button'
                          className='border border-slate-500 bg-slate-300 px-2 py-1 hover:bg-slate-500 rounded-md self-end my-1 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-slate-500 disabled:text-white'
                        >
                          Check-in
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
      <>
        {checkoutContainer.length > 0 ||
          (checkinContainer.length > 0 && (
            <button
              className='border border-slate-500 rounded-lg bg-slate-400 bg-opacity-40 text-red-700 px-2 py-1 self-end mr-5 my-2'
              onClick={() => {
                checkoutContainer.length > 0 && setModalCheckout(true);
                checkinContainer.length > 0 && setModalCheckin(true);
              }}
            >
              <BsFillBellFill />
            </button>
          ))}
      </>
      {checkoutContainer.length > 0 && (
        <>
          {modalCheckout &&
            checkoutContainer.map((payload, i) => (
              <CardCheckout
                key={payload.idProd + i}
                {...{
                  ...payload,
                  setModalCheckout,
                  baseUrl,
                  token,
                  listHosts,
                  host,
                  handleCheckoutAnswer,
                }}
              />
            ))}
        </>
      )}

      {checkinContainer.length > 0 && (
        <>
          {modalCheckin &&
            checkinContainer.map((payload, i) => (
              <CardCheckin
                key={payload.prodId + i}
                {...{
                  ...payload,
                  setModalCheckin,
                  baseUrl,
                  token,
                  listHosts,
                  host,
                  handleCheckinAnswer,
                }}
              />
            ))}
        </>
      )}
      <ul className='p-1 h-[80%] w-full flex flex-col items-center overflow-auto'>
        {host
          .filter((el) => {
            const qName = el.name.toLocaleLowerCase();
            const qDescription = el.description.toLocaleLowerCase();
            const q = search.toLocaleLowerCase();
            return !!(qName.includes(q) || qDescription.includes(q));
          })
          .map((prod, i) => (
            <Card
              key={prod._id + i}
              {...{
                ...prod,
                listHosts,
                qrcode,
                setQrcode,
                token,
                socket,
                userId,
                user,
                removeProduct,
              }}
            />
          ))}
      </ul>
    </section>
  );
};

export default Host;
