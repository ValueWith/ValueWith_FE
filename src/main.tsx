import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import router from './Router.tsx';

import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import EmotionProvider from '@/assets/styles/EmotionProvider.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <EmotionProvider>
          <RouterProvider router={router} />
        </EmotionProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
