import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  className?: string;
}

export const StarRating = ({ rating, max = 5, size = 14, className = '' }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, index) => (
        <Star
          key={index}
          size={size}
          className={`
            ${index < rating ? 'fill-sage text-sage' : 'fill-transparent text-sage/30'}
            ${className}
          `}
        />
      ))}
    </div>
  );
};
