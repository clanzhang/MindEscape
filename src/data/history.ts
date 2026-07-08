import type { HistoryRecord } from '@/types';
import { plans } from './plans';

export const historyRecords: HistoryRecord[] = [
  {
    id: 'history-1',
    plan: plans[0],
    date: '2026-07-08',
    status: 'completed',
  },
  {
    id: 'history-2',
    plan: plans[1],
    date: '2026-07-05',
    status: 'completed',
  },
  {
    id: 'history-3',
    plan: plans[2],
    date: '2026-06-30',
    status: 'completed',
  },
  {
    id: 'history-4',
    plan: plans[0],
    date: '2026-06-25',
    status: 'pending',
  },
];
