import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NewsFeed from './components/NewsFeed';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-gray-100 min-h-screen">
        <NewsFeed />
      </div>
    </QueryClientProvider>
  );
}

export default App;