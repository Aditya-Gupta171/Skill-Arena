"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import Loader from './Loader';

const LoaderContext = createContext({
  setLoading: (loading: boolean) => {},
});

export const useLoader = () => useContext(LoaderContext);

export default function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <LoaderContext.Provider value={{ setLoading }}>
      <Loader />
      {children}
    </LoaderContext.Provider>
  );
}