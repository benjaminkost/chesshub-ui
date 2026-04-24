import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'

async function enableMocking() {
  if (import.meta.env.VITE_USE_MOCKS !== 'true') {
    return;
  }
 
  const { worker } = await import('./api/mocks/browser');
 
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
     onUnhandledRequest: 'bypass', // Don't warn for unmocked requests
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
});
