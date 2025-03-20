
import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: string;
  date: string;
}

interface CategorySectionProps {
  title: string;
  subtitle?: string;
  articles: Article[];
  categoryLink: string;
  className?: string;
  layout?: 'grid' | 'list';
  columns?: 2 | 3 | 4;
}

const CategorySection = ({
  title,
  subtitle,
  articles,
  categoryLink,
  className,
  layout = 'grid',
  columns = 4,
}: CategorySectionProps) => {
  if (articles.length === 0) return null;

  // Define grid classes based on the number of columns
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  return (
    <section className={cn('py-8 md:py-12', className)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
          <div>
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">{title}</h2>
            {subtitle && <p className="text-gray-600 text-sm md:text-base">{subtitle}</p>}
          </div>
          <Button variant="ghost" asChild className="text-journal-blue hover:text-journal-darkBlue mt-2 md:mt-0 group">
            <Link to={categoryLink} className="flex items-center">
              Ver todas
              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {layout === 'grid' ? (
          <div className={cn('grid gap-4 md:gap-6', gridCols[columns])}>
            {articles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {articles.map((article) => (
              <ArticleCard key={article.id} {...article} minimal />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
