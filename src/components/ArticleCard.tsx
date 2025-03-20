
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: string;
  date: string;
  className?: string;
  featured?: boolean;
  minimal?: boolean;
}

const ArticleCard = ({
  id,
  title,
  excerpt,
  coverImage,
  category,
  author,
  date,
  className,
  featured = false,
  minimal = false,
}: ArticleCardProps) => {
  if (minimal) {
    return (
      <div className={cn('news-card', className)}>
        <Link to={`/materia/${id}`} className="flex flex-row h-full">
          <div className="w-1/3 overflow-hidden">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300"
            />
          </div>
          <div className="w-2/3 p-3 md:p-4">
            <Badge className="mb-2 bg-journal-yellow text-gray-800 hover:bg-journal-lightYellow text-xs">
              {category}
            </Badge>
            <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base line-clamp-2">{title}</h3>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{date}</span>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  if (featured) {
    return (
      <div className={cn('relative overflow-hidden rounded-xl group h-full', className)}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10 z-10" />
        <img
          src={coverImage}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-20">
          <Badge className="mb-2 md:mb-3 bg-journal-yellow text-gray-800 hover:bg-journal-lightYellow text-xs">
            {category}
          </Badge>
          <Link to={`/materia/${id}`}>
            <h2 className="text-white text-lg md:text-2xl font-bold mb-2 md:mb-3 line-clamp-2 hover:text-journal-lightYellow transition-colors">
              {title}
            </h2>
          </Link>
          <p className="text-gray-200 text-sm mb-3 md:mb-4 line-clamp-2">{excerpt}</p>
          <div className="flex items-center text-white/70 text-xs md:text-sm">
            <User className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            <span className="mr-3">{author}</span>
            <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            <span>{date}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('news-card h-full flex flex-col', className)}>
      <div className="relative overflow-hidden">
        <Link to={`/materia/${id}`}>
          <img
            src={coverImage}
            alt={title}
            className="w-full h-40 md:h-48 object-cover transition-transform duration-300"
          />
        </Link>
      </div>
      <div className="p-3 md:p-5 flex-grow flex flex-col">
        <Badge className="self-start mb-2 bg-journal-yellow text-gray-800 hover:bg-journal-lightYellow text-xs">
          {category}
        </Badge>
        <Link to={`/materia/${id}`}>
          <h3 className="font-bold text-base md:text-lg text-gray-900 mb-1 md:mb-2 line-clamp-2 hover:text-journal-blue transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-3 flex-grow">{excerpt}</p>
        <div className="flex items-center text-xs md:text-sm text-gray-500 mt-auto pt-2 md:pt-4 border-t border-gray-100">
          <User className="h-3 w-3 md:h-4 md:w-4 mr-1" />
          <span className="mr-3">{author}</span>
          <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1" />
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
