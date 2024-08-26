'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getMessageCount } from '@/app/actions/getMessageCount';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);

  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      getMessageCount().then((res) => {
        if (res.count) setUnreadCount(res.count);
      });
    }
  }, [session, getMessageCount]);

  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useContextProvider() {
  return useContext(GlobalContext);
}
