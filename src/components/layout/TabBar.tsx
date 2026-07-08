import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Compass, History, User } from 'lucide-react';

const tabs = [
  { id: 'home', path: '/', icon: Home, label: '首页' },
  { id: 'explore', path: '/explore', icon: Compass, label: '探索' },
  { id: 'history', path: '/history', icon: History, label: '历史' },
  { id: 'profile', path: '/profile', icon: User, label: '我的' },
];

export const TabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = tabs.find((tab) => tab.path === location.pathname)?.id || 'home';

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 max-w-[428px] mx-auto"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white/90 backdrop-blur-soft border-t border-cream px-4 py-2 safe-area-bottom">
        <div className="flex justify-around items-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className={`
                  flex flex-col items-center gap-1 px-4 py-2 rounded-xl
                  transition-all duration-300 cursor-pointer
                  ${isActive ? 'text-sage' : 'text-deep-gray/50'}
                `}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-sage/10 rounded-full"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                  <Icon
                    size={22}
                    strokeWidth={1.5}
                    className={`transition-all duration-300 ${isActive ? 'scale-110' : ''}`}
                  />
                </div>
                <span className="text-xs font-medium">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
