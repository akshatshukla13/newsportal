import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { fetchNews } from '../api/newsApi';
import NewsCard from './NewsCard';
import { Loader } from 'lucide-react';

const NewsFeed: React.FC = () => {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['news'],
    queryFn: ({ pageParam = 1 }) => fetchNews(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= Math.ceil(lastPage.totalResults / 10) ? nextPage : undefined;
    },
    initialPageSize: 10,
  });

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === 'pending') {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="h-screen flex items-center justify-center text-red-600">
        Error loading news
      </div>
    );
  }

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {data.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.articles.map((article) => (
            <NewsCard key={article.url} article={article} />
          ))}
        </React.Fragment>
      ))}
      
      <div ref={ref} className="h-20 flex items-center justify-center">
        {isFetchingNextPage && (
          <Loader className="w-6 h-6 animate-spin text-blue-600" />
        )}
      </div>
    </div>
  );
};

export default NewsFeed;