import { ReactNode, Suspense } from 'react';
import ListNode from './components/ListNode';
import NavBar from './components/NavBar';
import NoteForm from './components/NoteForm';

console.log('App logger');

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense>
      <NavBar />
      {children}
      <div>
        <p>This message is from RSC after shell</p>
      </div>
    </Suspense>
  );
}

const routeMapper = (pathname: string) => {
  if (pathname === '/list') {
    // @ts-ignore
    return <ListNode />;
  }

  if (pathname === '/new') {
    // @ts-ignore
    return <NoteForm />;
  }

  return <p>unmatch route</p>
} 
const App = ({ pathname }: { pathname: string }) => {
  console.log("App received pathname", pathname);
  return (
    <Layout>
      <Suspense>
        {routeMapper(pathname)}
      </Suspense>
    </Layout>
  );
};

export default App;
