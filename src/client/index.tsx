import ReactDOM from 'react-dom/client';
import Router from './router';
import { ErrorBoundary } from 'react-error-boundary';

const Root = () => {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <div>bootstrap</div>
      <Router />
    </ErrorBoundary>
  );
}

function Error({ error }: { error: any }) {
  return (
    <div>
      <h1>Application Error</h1>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error.stack}</pre>
    </div>
  );
}

const rootEl = document.getElementById('root');

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<Root />);
}
