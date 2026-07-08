import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Mountain, Droplets, Building2, Heart, Tent, Coffee } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { exploreCards } from '@/data/explore';
import type { Category } from '@/types';

const categories: Category[] = ['全部', '山林', '水岸', '小镇', '疗愈空间', '营地', '咖啡馆'];

const CategoryIcon = ({ category }: { category: Category }) => {
  const iconProps = { size: 16 };
  switch (category) {
    case '山林': return <Mountain {...iconProps} />;
    case '水岸': return <Droplets {...iconProps} />;
    case '小镇': return <Building2 {...iconProps} />;
    case '疗愈空间': return <Heart {...iconProps} />;
    case '营地': return <Tent {...iconProps} />;
    case '咖啡馆': return <Coffee {...iconProps} />;
    default: return null;
  }
};

export const Explore = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Category>('全部');
  const [cards, setCards] = useState(exploreCards.slice(0, 8));
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [startY, setStartY] = useState(0);
  const [showRefresh, setShowRefresh] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollHeight - scrollTop - clientHeight < 200 && !isLoading && cards.length < exploreCards.length) {
        loadMore();
      }
    };

    const element = containerRef.current;
    element?.addEventListener('scroll', handleScroll);
    return () => element?.removeEventListener('scroll', handleScroll);
  }, [isLoading, cards.length]);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      const remaining = exploreCards.slice(cards.length);
      const toAdd = remaining.slice(0, 4);
      setCards([...cards, ...toAdd]);
      setIsLoading(false);
    }, 1000);
  };

  const handleRefresh = () => {
    setTimeout(() => {
      setCards(exploreCards.slice(0, 8));
      setSelectedCategory('全部');
    }, 1000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      const currentY = e.touches[0].clientY;
      const diff = currentY - startY;
      if (diff > 50) {
        setShowRefresh(true);
      } else {
        setShowRefresh(false);
      }
    }
  };

  const handleTouchEnd = () => {
    if (showRefresh) {
      handleRefresh();
    }
    setShowRefresh(false);
  };

  const filteredCards = selectedCategory === '全部' 
    ? cards 
    : cards.filter(card => card.location.category === (selectedCategory === '山林' ? 'mountain' : selectedCategory === '水岸' ? 'water' : selectedCategory === '小镇' ? 'town' : selectedCategory === '疗愈空间' ? 'healing' : selectedCategory === '营地' ? 'camp' : 'cafe'));

  const heights = [280, 320, 260, 300, 290, 310, 270, 330];

  return (
    <div className="page-container pb-24">
      <motion.div 
        className="sticky top-0 z-40 bg-warm-white px-6 py-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 bg-white rounded-xl shadow-soft p-3 flex items-center gap-3">
            <Search size={18} className="text-deep-gray/40" />
            <input
              type="text"
              placeholder="搜索目的地…"
              className="flex-1 bg-transparent text-sm text-deep-gray placeholder-deep-gray/40 outline-none"
            />
          </div>
          <motion.button
            className="w-11 h-11 bg-white rounded-xl shadow-soft flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
          >
            <Filter size={18} className="text-deep-gray" />
          </motion.button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap
                text-sm font-medium transition-all duration-300
                ${selectedCategory === category 
                  ? 'bg-sage text-white' 
                  : 'bg-white text-deep-gray/70 shadow-soft'
                }
              `}
              whileTap={{ scale: 0.95 }}
            >
              <CategoryIcon category={category} />
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div 
        ref={containerRef}
        className="px-6 pt-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence>
          {showRefresh && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-sage/30 border-t-sage rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 gap-3">
          {filteredCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col"
            >
              <Card 
                onClick={() => navigate(`/plan/${card.location.id}`)}
                className="flex-1"
                style={{ height: heights[index % heights.length] }}
              >
                <div className="relative h-40">
                  <img
                    src={card.location.image}
                    alt={card.location.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-2 left-2">
                    <span className="inline-block px-2 py-0.5 bg-white/90 rounded-full text-xs font-medium text-sage">
                      {card.location.category === 'mountain' ? '山林' : card.location.category === 'water' ? '水岸' : card.location.category === 'town' ? '小镇' : card.location.category === 'healing' ? '疗愈' : card.location.category === 'camp' ? '营地' : '咖啡'}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-deep-gray text-sm mb-1">{card.location.name}</h3>
                  <p className="text-xs text-deep-gray/60 mb-2 line-clamp-2">{card.emotionDescription}</p>
                  <div className="flex flex-wrap gap-1">
                    {card.location.emotionTags.slice(0, 2).map((tag) => (
                      <Tag key={tag} className="px-2 py-0.5 text-xs">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-6 h-6 border-2 border-sage/30 border-t-sage rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {cards.length >= exploreCards.length && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-deep-gray/40 py-6"
          >
            已经到底了
          </motion.p>
        )}
      </div>
    </div>
  );
};
