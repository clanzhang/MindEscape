import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, Clock, Users, Wallet, MapPin } from 'lucide-react';
import { Tag } from '@/components/ui/Tag';
import { Slider } from '@/components/ui/Slider';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import type { EmotionTag, QuickParam } from '@/types';
import { plans } from '@/data/plans';

const emotionTags: EmotionTag[] = ['疲惫', '焦虑', '无聊', '想独处', '想亲近自然', '想发泄'];

const timeOptions = ['半天', '一天', '周末'];
const peopleOptions = ['独自', '两人', '带娃'];
const distanceOptions = ['就近30min', '适中1h', '远一点'];

const getGreeting = () => {
  const hour = new Date().getHours();
  const day = new Date().getDay();
  const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  
  if (hour < 6) return '夜深了，早点休息';
  if (hour < 9) return `${dayNames[day]}早晨，新的一天开始了`;
  if (hour < 12) return `${dayNames[day]}上午，辛苦了`;
  if (hour < 14) return '中午好，记得吃饭';
  if (hour < 18) return `${dayNames[day]}下午，累了就歇会儿`;
  if (hour < 22) return `${dayNames[day]}晚上，辛苦了一天`;
  return '夜深了，好好休息';
};

export const Home = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState<EmotionTag[]>([]);
  const [showParams, setShowParams] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quickParams, setQuickParams] = useState<QuickParam>({
    time: 'half-day',
    people: 'alone',
    budget: 200,
    distance: 'near',
  });

  const handleEmotionClick = (tag: EmotionTag) => {
    setSelectedEmotions((prev) => {
      if (prev.includes(tag)) {
        const newTags = prev.filter((t) => t !== tag);
        if (newTags.length === 0) {
          setInputValue('');
        } else {
          setInputValue(newTags.join('，'));
        }
        return newTags;
      } else {
        const newTags = [...prev, tag];
        setInputValue(newTags.join('，'));
        return newTags;
      }
    });
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/plan/${plans[0].id}`);
    }, 1500);
  };

  return (
    <div className="page-container pb-24">
      <motion.div 
        className="relative h-64 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div 
          className="absolute inset-0 bg-gradient-to-br from-sage/20 via-cream to-warm-white animate-breathe"
        />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=428&h=256&fit=crop')] bg-cover bg-center opacity-30" />
        
        <div className="relative z-10 px-6 pt-12">
          <motion.h1 
            className="text-2xl font-playfair text-deep-gray mb-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {getGreeting()}
          </motion.h1>
          <motion.p 
            className="text-deep-gray/60 text-sm"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            告诉我们你的感受，我们帮你找到逃离的方向
          </motion.p>
        </div>
      </motion.div>

      <motion.div 
        className="px-6 -mt-6 relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Input
          value={inputValue}
          onChange={setInputValue}
          placeholder="今天好累，想找个安静的地方待一下午…"
          className="mb-4"
        />

        <div className="flex flex-wrap gap-2 mb-4">
          {emotionTags.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
            >
              <Tag
                selected={selectedEmotions.includes(tag)}
                onClick={() => handleEmotionClick(tag)}
              >
                {tag}
              </Tag>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={() => setShowParams(!showParams)}
          className="w-full flex items-center justify-center gap-2 py-3 text-sm text-deep-gray/60 hover:text-sage transition-colors"
          whileTap={{ scale: 0.98 }}
        >
          <Sparkles size={16} />
          <span>快速设置偏好</span>
          <ChevronDown 
            size={16} 
            className={`transition-transform duration-300 ${showParams ? 'rotate-180' : ''}`} 
          />
        </motion.button>

        <AnimatePresence>
          {showParams && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <Card className="p-5 mb-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={14} className="text-sage" />
                      <span className="text-sm text-deep-gray/70">时间</span>
                    </div>
                    <div className="flex gap-2">
                      {timeOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => setQuickParams({ ...quickParams, time: option === '半天' ? 'half-day' : option === '一天' ? 'day' : 'weekend' })}
                          className={`
                            flex-1 py-2 rounded-xl text-sm font-medium transition-all
                            ${quickParams.time === (option === '半天' ? 'half-day' : option === '一天' ? 'day' : 'weekend')
                              ? 'bg-sage text-white'
                              : 'bg-cream text-deep-gray/70'
                            }
                          `}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users size={14} className="text-sage" />
                      <span className="text-sm text-deep-gray/70">人数</span>
                    </div>
                    <div className="flex gap-2">
                      {peopleOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => setQuickParams({ ...quickParams, people: option === '独自' ? 'alone' : option === '两人' ? 'couple' : 'family' })}
                          className={`
                            flex-1 py-2 rounded-xl text-sm font-medium transition-all
                            ${quickParams.people === (option === '独自' ? 'alone' : option === '两人' ? 'couple' : 'family')
                              ? 'bg-sage text-white'
                              : 'bg-cream text-deep-gray/70'
                            }
                          `}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet size={14} className="text-sage" />
                  </div>
                  <Slider
                    value={quickParams.budget}
                    onChange={(value) => setQuickParams({ ...quickParams, budget: value })}
                    min={0}
                    max={500}
                    step={50}
                    label="预算"
                    unit="元"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={14} className="text-sage" />
                    <span className="text-sm text-deep-gray/70">距离</span>
                  </div>
                  <div className="flex gap-2">
                    {distanceOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => setQuickParams({ ...quickParams, distance: option === '就近30min' ? 'near' : option === '适中1h' ? 'medium' : 'far' })}
                        className={`
                          flex-1 py-2 rounded-xl text-sm font-medium transition-all
                          ${quickParams.distance === (option === '就近30min' ? 'near' : option === '适中1h' ? 'medium' : 'far')
                            ? 'bg-sage text-white'
                            : 'bg-cream text-deep-gray/70'
                          }
                        `}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleSubmit}
          disabled={isLoading || !inputValue.trim()}
          className="w-full bg-sunset text-white py-4 rounded-2xl font-medium text-lg
            shadow-soft hover:bg-sunset/90 transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            active:scale-95"
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              <span>正在为你寻找…</span>
            </div>
          ) : (
            <span>帮我逃离</span>
          )}
        </motion.button>
      </motion.div>

      <motion.div 
        className="px-6 mt-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-base font-medium text-deep-gray mb-4">此刻别人在逃离…</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
          {plans.slice(0, 3).map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex-shrink-0 w-64"
            >
              <Card onClick={() => navigate(`/plan/${plan.id}`)}>
                <div className="relative h-36">
                  <img
                    src={plan.locations[0].image}
                    alt={plan.locations[0].name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block px-2 py-1 bg-white/90 rounded-full text-xs font-medium text-sage">
                      {plan.emotionKeyword}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-deep-gray mb-1">{plan.locations[0].name}</h3>
                  <p className="text-sm text-deep-gray/60 line-clamp-2">{plan.prescription}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
