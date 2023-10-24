import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import { RecoilRoot } from 'recoil';

import { QueryClient, QueryClientProvider } from 'react-query';
import EmotionProvider from './assets/styles/EmotionProvider.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <EmotionProvider>
          <App />
        </EmotionProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
