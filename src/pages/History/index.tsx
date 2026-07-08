import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Tag as TagIcon, ArrowRight, Footprints } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { historyRecords } from '@/data/history';

const groupByMonth = (records: typeof historyRecords) => {
  const groups: Record<string, typeof historyRecords> = {};
  
  records.forEach((record) => {
    const date = new Date(record.date);
    const monthKey = `${date.getFullYear()}年${date.getMonth() + 1}月`;
    
    if (!groups[monthKey]) {
      groups[monthKey] = [];
    }
    groups[monthKey].push(record);
  });
  
  return groups;
};

export const History = () => {
  const navigate = useNavigate();
  const groupedRecords = groupByMonth(historyRecords);

  if (Object.keys(groupedRecords).length === 0) {
    return (
      <div className="page-container pb-24">
        <motion.div 
          className="px-6 pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-32 h-32 bg-cream rounded-full flex items-center justify-center mb-6"
            >
              <Footprints size={48} className="text-sage/50" />
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-playfair text-deep-gray mb-2"
            >
              你的第一次逃离
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-deep-gray/60 text-center"
            >
              从这里开始，记录每一次心灵的出走
            </motion.p>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => navigate('/')}
              className="mt-8 bg-sage text-white px-8 py-3 rounded-full font-medium"
              whileTap={{ scale: 0.95 }}
            >
              开始第一次逃离
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-container pb-24">
      <motion.div 
        className="px-6 pt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-2xl font-playfair text-deep-gray mb-6">逃离记录</h1>

        <div className="space-y-6">
          {Object.entries(groupedRecords).map(([month, records], monthIndex) => (
            <motion.div
              key={month}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: monthIndex * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={16} className="text-sage" />
                <span className="text-sm font-medium text-deep-gray">{month}</span>
                <span className="text-xs text-deep-gray/40">({records.length}次)</span>
              </div>

              <div className="space-y-3">
                {records.map((record, recordIndex) => (
                  <motion.div
                    key={record.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: monthIndex * 0.1 + recordIndex * 0.05 }}
                  >
                    <Card 
                      onClick={() => navigate(`/plan/${record.plan.id}`)}
                      className="p-4"
                    >
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24 flex-shrink-0">
                          <img
                            src={record.plan.locations[0].image}
                            alt={record.plan.locations[0].name}
                            className="w-full h-full object-cover rounded-xl"
                            loading="lazy"
                          />
                          <div className={`
                            absolute top-1 right-1 px-2 py-0.5 rounded-full text-xs font-medium
                            ${record.status === 'completed' 
                              ? 'bg-sage text-white' 
                              : record.status === 'pending' 
                                ? 'bg-sunset text-white' 
                                : 'bg-deep-gray/30 text-white'
                            }
                          `}>
                            {record.status === 'completed' ? '已完成' : record.status === 'pending' ? '待出发' : '已取消'}
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-deep-gray">{record.plan.locations[0].name}</h3>
                              <ArrowRight size={14} className="text-deep-gray/30" />
                            </div>
                            <div className="flex items-center gap-1 text-xs text-deep-gray/60 mb-2">
                              <MapPin size={12} />
                              {record.plan.locations[0].distance}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-deep-gray/60">
                              <TagIcon size={12} />
                              {record.plan.emotionKeyword}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-deep-gray/40">
                              {new Date(record.date).toLocaleDateString('zh-CN', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
