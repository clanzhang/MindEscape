import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sun, Cloud, CloudRain, Clock, MapPin, Star, ChevronLeft, ChevronRight, RefreshCw, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { StarRating } from '@/components/ui/StarRating';
import { Card } from '@/components/ui/Card';
import { plans, generatePlan } from '@/data/plans';

const WeatherIcon = ({ icon }: { icon: string }) => {
  const iconProps = { size: 24, className: 'text-white' };
  switch (icon) {
    case 'sun': return <Sun {...iconProps} />;
    case 'cloud': return <Cloud {...iconProps} />;
    case 'cloud-rain': return <CloudRain {...iconProps} />;
    default: return <Sun {...iconProps} />;
  }
};

export const Plan = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentPlan, setCurrentPlan] = useState(plans.find((p) => p.id === id) || plans[0]);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = currentPlan.prescription;
    let index = 0;
    setDisplayedText('');
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [currentPlan.prescription]);

  const handleSwipe = (direction: 'left' | 'right') => {
    const locations = currentPlan.locations;
    if (direction === 'left' && currentLocationIndex < locations.length - 1) {
      setCurrentLocationIndex(currentLocationIndex + 1);
    } else if (direction === 'right' && currentLocationIndex > 0) {
      setCurrentLocationIndex(currentLocationIndex - 1);
    }
  };

  const handleRefresh = () => {
    const newPlan = generatePlan(currentPlan.emotionKeyword);
    setCurrentPlan(newPlan);
    setCurrentLocationIndex(0);
  };

  const currentLocation = currentPlan.locations[currentLocationIndex];

  return (
    <div className="page-container pb-32">
      <motion.div 
        className="relative h-56"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sage/30 to-cream" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=428&h=224&fit=crop')] bg-cover bg-center opacity-40" />
        
        <div className="relative z-10 px-6 pt-8">
          <motion.button
            onClick={() => navigate('/')}
            className="w-10 h-10 bg-white/80 backdrop-blur-soft rounded-full flex items-center justify-center mb-6"
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft size={20} className="text-deep-gray" />
          </motion.button>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Tag selected>{currentPlan.emotionKeyword}</Tag>
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-sunset text-sunset" />
                <span className="text-sm font-medium text-deep-gray">{currentPlan.matchPercentage}%匹配</span>
              </div>
            </div>
            <p className="text-lg text-deep-gray leading-relaxed">
              {displayedText}
              <span className="animate-pulse">|</span>
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        ref={containerRef}
        className="px-6 -mt-4 relative"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLocationIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <div className="relative h-56">
                  <img
                    src={currentLocation.image}
                    alt={currentLocation.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-soft rounded-full px-3 py-1.5">
                    <WeatherIcon icon={currentLocation.weather.icon} />
                    <span className="text-sm font-medium text-deep-gray">{currentLocation.weather.temp}°</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-xl font-playfair text-white mb-1">{currentLocation.name}</h2>
                    <div className="flex items-center gap-4 text-white/80 text-sm">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {currentLocation.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {currentLocation.travelTime}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentLocation.emotionTags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-cream rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <LockIcon size={14} className="text-sage" />
                        <span className="text-xs text-deep-gray/60">隐蔽性</span>
                      </div>
                      <StarRating rating={currentLocation.emotionScore.privacy} size={12} />
                    </div>
                    <div className="bg-cream rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <UserIcon size={14} className="text-sage" />
                        <span className="text-xs text-deep-gray/60">单人友好</span>
                      </div>
                      <StarRating rating={currentLocation.emotionScore.soloFriendly} size={12} />
                    </div>
                    <div className="bg-cream rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <TreeDeciduousIcon size={14} className="text-sage" />
                        <span className="text-xs text-deep-gray/60">自然指数</span>
                      </div>
                      <StarRating rating={currentLocation.emotionScore.natureIndex} size={12} />
                    </div>
                    <div className="bg-cream rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Volume2Icon size={14} className="text-sage" />
                        <span className="text-xs text-deep-gray/60">白噪音</span>
                      </div>
                      <StarRating rating={currentLocation.emotionScore.whiteNoise} size={12} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-cream">
                    <span className="text-sm text-deep-gray/60">预计花费</span>
                    <span className="text-xl font-medium text-sunset">
                      {currentLocation.price === 0 ? '免费' : `¥${currentLocation.price}`}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-4">
            <motion.button
              onClick={() => handleSwipe('right')}
              disabled={currentLocationIndex === 0}
              className="w-10 h-10 bg-white rounded-full shadow-soft flex items-center justify-center
                disabled:opacity-30 disabled:cursor-not-allowed"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={20} className="text-deep-gray" />
            </motion.button>

            <div className="flex gap-2">
              {currentPlan.locations.map((_, index) => (
                <button
                  key={index}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-300
                    ${index === currentLocationIndex ? 'bg-sage w-6' : 'bg-cream'}
                  `}
                />
              ))}
            </div>

            <motion.button
              onClick={() => handleSwipe('left')}
              disabled={currentLocationIndex === currentPlan.locations.length - 1}
              className="w-10 h-10 bg-white rounded-full shadow-soft flex items-center justify-center
                disabled:opacity-30 disabled:cursor-not-allowed"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={20} className="text-deep-gray" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="px-6 mt-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-base font-medium text-deep-gray mb-4">行程安排</h3>
        <Card className="p-5">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-cream" />
            
            {currentPlan.itinerary.map((item, index) => (
              <motion.div
                key={item.time}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="relative flex gap-4 mb-5 last:mb-0"
              >
                <div className="relative z-10 w-8 h-8 bg-sage rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-white font-medium">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-medium text-deep-gray">{item.time}</span>
                    <span className="text-sm text-sage">{item.activity}</span>
                  </div>
                  {item.description && (
                    <p className="text-sm text-deep-gray/60">{item.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div 
        className="fixed bottom-0 left-0 right-0 z-50 max-w-[428px] mx-auto"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="bg-white/95 backdrop-blur-soft border-t border-cream px-6 py-4 safe-area-bottom">
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={handleRefresh}
            >
              <RefreshCw size={18} className="mr-2" />
              换一个
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
            >
              <Navigation size={18} className="mr-2" />
              就这个，出发
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const LockIcon = ({ size, className }: { size: number; className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const UserIcon = ({ size, className }: { size: number; className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const TreeDeciduousIcon = ({ size, className }: { size: number; className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 20H9a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2Z"/>
    <path d="M12 20v-10"/>
    <path d="M9 20v-10"/>
    <path d="M15 20v-10"/>
  </svg>
);

const Volume2Icon = ({ size, className }: { size: number; className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
  </svg>
);
