import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useZusStore = create(
  persist(
    (set) => ({
      token: '',
      role: '',
      _id: '',
      userName: '',
      setUserName: (name) => set((state) => ({ userName: name })),
      setUserId: (id) => set((state) => ({ _id: id })),
      setToken: (tkn) => set((state) => ({ token: tkn })),
      setRole: (rle) => set((state) => ({ role: rle })),
    }),
    { name: 'token' }
  )
);
