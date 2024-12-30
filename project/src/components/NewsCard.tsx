import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Clock } from 'lucide-react';
import { NewsArticle } from '../types/news';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="w-full h-screen snap-start flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-md w-full">
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.urlToImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475'}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
            <span className="text-white text-sm font-medium px-3 py-1 rounded-full bg-blue-500/80">
              {article.source.name}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-xl font-bold mb-3 text-gray-800">{article.title}</h2>
          <p className="text-gray-600 mb-4">{article.description}</p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              {formatDate(article.publishedAt)}
            </div>
            {article.author && (
              <span className="italic">By {article.author}</span>
            )}
          </div>
          
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Read More <ExternalLink size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;