import type { Plan } from '@/types';
import { locations } from './locations';

export const plans: Plan[] = [
  {
    id: 'plan-1',
    emotionKeyword: '疲惫',
    matchPercentage: 92,
    prescription: '你需要一场彻底的放松，让身心回归自然。建议找一个安静的地方，放下所有的工作和烦恼，只专注于呼吸和当下。',
    locations: [
      locations[0],
      locations[2],
      locations[6],
    ],
    itinerary: [
      { time: '14:00', activity: '出发', description: '从市区出发，前往目的地' },
      { time: '14:30', activity: '到达云栖竹径', description: '漫步竹林，感受自然' },
      { time: '15:30', activity: '下午茶', description: '在竹林深处享用茶点' },
      { time: '16:30', activity: '冥想时光', description: '找一处安静角落，闭目养神' },
      { time: '17:30', activity: '返程', description: '带着平静的心情回家' },
    ],
    createdAt: '2026-07-08',
  },
  {
    id: 'plan-2',
    emotionKeyword: '焦虑',
    matchPercentage: 88,
    prescription: '焦虑源于对未来的过度担忧。建议你找一个能让心静下来的地方，通过仪式感和专注的活动来找回内心的安定。',
    locations: [
      locations[2],
      locations[3],
      locations[7],
    ],
    itinerary: [
      { time: '09:00', activity: '出发', description: '清晨出发，避开人群' },
      { time: '09:40', activity: '法喜寺祈福', description: '上香祈福，聆听钟声' },
      { time: '11:00', activity: '素斋', description: '享用寺庙素斋，清心寡欲' },
      { time: '12:30', activity: '前往良渚', description: '感受历史的厚重' },
      { time: '14:00', activity: '遗址公园漫步', description: '在空旷的草地上行走' },
      { time: '16:00', activity: '返程', description: '带着宁静的心境返回' },
    ],
    createdAt: '2026-07-07',
  },
  {
    id: 'plan-3',
    emotionKeyword: '想独处',
    matchPercentage: 95,
    prescription: '有时候，独处是最好的充电方式。建议你找一个完全属于自己的空间，做一些只有自己才懂的事情。',
    locations: [
      locations[5],
      locations[6],
      locations[1],
    ],
    itinerary: [
      { time: '10:00', activity: '出发', description: '前往安缦法云' },
      { time: '10:45', activity: '入住', description: '享受私人空间' },
      { time: '11:30', activity: '冥想', description: '专业冥想指导' },
      { time: '13:00', activity: '午餐', description: '精致的禅意料理' },
      { time: '14:00', activity: '私人时光', description: '阅读、品茶、发呆' },
      { time: '16:00', activity: '森林浴', description: '在周边山林中漫步' },
      { time: '18:00', activity: '返程', description: '带着满满的能量回家' },
    ],
    createdAt: '2026-07-06',
  },
];

export const generatePlan = (emotion: string): Plan => {
  const randomLocations = [...locations].sort(() => Math.random() - 0.5).slice(0, 3);
  const matchPercentage = Math.floor(Math.random() * 15) + 82;
  
  const prescriptions: Record<string, string> = {
    '疲惫': '你需要一场彻底的放松，让身心回归自然。建议找一个安静的地方，放下所有的工作和烦恼，只专注于呼吸和当下。',
    '焦虑': '焦虑源于对未来的过度担忧。建议你找一个能让心静下来的地方，通过仪式感和专注的活动来找回内心的安定。',
    '无聊': '生活需要一些新鲜感。建议你去探索一个从未去过的地方，体验一些不一样的事物，让好奇心重新点燃。',
    '想独处': '有时候，独处是最好的充电方式。建议你找一个完全属于自己的空间，做一些只有自己才懂的事情。',
    '想亲近自然': '自然是最好的疗愈师。建议你走进山林或水边，让绿色和清新空气包围你，感受生命的力量。',
    '想发泄': '压力需要一个出口。建议你找一个能尽情释放的地方，无论是呐喊、奔跑还是哭泣，让情绪自然流淌。',
  };

  return {
    id: `plan-${Date.now()}`,
    emotionKeyword: emotion,
    matchPercentage,
    prescription: prescriptions[emotion] || '每个人都需要偶尔逃离，找到属于自己的那片宁静之地。',
    locations: randomLocations,
    itinerary: [
      { time: '14:00', activity: '出发', description: '从市区出发，前往目的地' },
      { time: '14:40', activity: '到达', description: `抵达${randomLocations[0].name}` },
      { time: '15:00', activity: '开始体验', description: randomLocations[0].description },
      { time: '16:30', activity: '自由时光', description: '享受独处的美好' },
      { time: '18:00', activity: '返程', description: '带着好心情回家' },
    ],
    createdAt: new Date().toISOString().split('T')[0],
  };
};
