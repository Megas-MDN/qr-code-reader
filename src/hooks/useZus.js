import { useState, useEffect } from 'react';

export const useZus = (store, cb) => {
  const result = store(cb);
  const [state, setState] = useState();
  useEffect(() => {
    setState(result);
  }, [result]);
  return state;
};
