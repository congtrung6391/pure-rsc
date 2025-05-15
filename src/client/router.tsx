'use client';

console.log('router logger');

import {
  createContext,
  startTransition,
  // @ts-ignore
  use,
  useContext,
  useState,
} from 'react';
import {
  createFromFetch,
  createFromReadableStream,
} from 'react-server-dom-webpack/client';

const RouterContext = createContext<{
  location: string;
  navigate: (loc: string) => void;
  refresh: (res: any) => void;
}>?.({
  location: '/',
  navigate: () => {},
  refresh: () => {},
});
const initialCache = new Map();

const Router = () => {
  const [cache, setCache] = useState(initialCache);
  const [location, setLocation] = useState<string>('/');

  let content = cache.get(location);

  if (!content) {
    content = createFromFetch(
      fetch('/rsc?location=' + encodeURIComponent(location)),
    );
    cache.set(location, content);
  }

  function navigate(nextLocation: string) {
    startTransition(() => {
      setLocation(nextLocation);
    });
  }


  function refresh(response: any) {
    startTransition(() => {
      const nextCache = new Map();
      if (response != null) {
        const locationKey = response.headers.get('X-Location');
        const nextContent = createFromReadableStream(response.body);
        nextCache.set(locationKey, nextContent);
        navigate(locationKey);
      }
      setCache(nextCache);
    });
  }

  return (
    <RouterContext.Provider value={{ location, refresh, navigate }}>
      {use(content)}
    </RouterContext.Provider>
  );
};


export function useRouter() {
  return useContext(RouterContext);
}

export default Router;
