'use client';

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
}>({
  location: '/',
  navigate: () => {},
  refresh: () => {},
});
const initialCache = new Map();

const Router = () => {
  const [cache, setCache] = useState(initialCache);
  const [location, setLocation] = useState('/');

  const locationKey = JSON.stringify(location);
  let content = cache.get(locationKey);

  if (!content) {
    content = createFromFetch(
      fetch('/rsc?location=' + encodeURIComponent(locationKey)),
    );
    cache.set(locationKey, content);
  }

  function refresh(response: any) {
    startTransition(() => {
      const nextCache = new Map();
      if (response != null) {
        const locationKey = response.headers.get('X-Location');
        const nextLocation = JSON.parse(locationKey);
        const nextContent = createFromReadableStream(response.body);
        nextCache.set(locationKey, nextContent);
        navigate(nextLocation);
      }
      setCache(nextCache);
    });
  }

  function navigate(nextLocation: string) {
    startTransition(() => {
      setLocation(nextLocation);
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
