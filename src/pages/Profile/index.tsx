import { motion } from 'framer-motion';
import { Settings, Heart, Bell, Info, Edit3, ChevronRight, Award } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { userProfile } from '@/data/user';

const menuItems = [
  { icon: Settings, label: '偏好设置', description: '情绪偏好、通知设置' },
  { icon: Heart, label: '收藏', description: '我喜欢的目的地' },
  { icon: Bell, label: '通知', description: '逃离提醒、消息通知' },
  { icon: Info, label: '关于', description: '关于 MindEscape' },
];

export const Profile = () => {
  return (
    <div className="page-container pb-24">
      <motion.div 
        className="relative h-48 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sage/20 to-cream" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=428&h=192&fit=crop')] bg-cover bg-center opacity-20" />
      </motion.div>

      <motion.div 
        className="px-6 -mt-12 relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={userProfile.avatar}
                alt={userProfile.nickname}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-white"
              />
              <motion.button
                className="absolute bottom-0 right-0 w-6 h-6 bg-sage rounded-full flex items-center justify-center"
                whileTap={{ scale: 0.9 }}
              >
                <Edit3 size={12} className="text-white" />
              </motion.button>
            </div>
            
            <div className="flex-1">
              <h1 className="text-xl font-playfair text-deep-gray mb-1">{userProfile.nickname}</h1>
              <p className="text-sm text-deep-gray/60 mb-3">{userProfile.bio}</p>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-sage" />
                  <span className="text-sm font-medium text-deep-gray">已逃离 {userProfile.escapeCount} 次</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="overflow-hidden">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.label}
                  className="w-full flex items-center gap-4 px-5 py-4 border-b border-cream last:border-b-0
                    hover:bg-warm-white/50 transition-colors text-left"
                  whileTap={{ scale: 0.98 }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center">
                    <Icon size={20} className="text-sage" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-deep-gray">{item.label}</h3>
                    <p className="text-xs text-deep-gray/50">{item.description}</p>
                  </div>
                  <ChevronRight size={18} className="text-deep-gray/30" />
                </motion.button>
              );
            })}
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-deep-gray/40">
            MindEscape - 情绪逃离舱
          </p>
          <p className="text-xs text-deep-gray/30 mt-1">
            版本 1.0.0
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
