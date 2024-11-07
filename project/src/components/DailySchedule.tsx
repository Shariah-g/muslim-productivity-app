import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import type { Habit } from '../types';

interface DailyScheduleProps {
  habits: Habit[];
  prayers: { name: string; time: string; duration: number }[];
}

export default function DailySchedule({ habits, prayers }: DailyScheduleProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const allEvents = [
    ...prayers.map(prayer => ({
      type: 'prayer',
      name: prayer.name,
      time: prayer.time,
      duration: prayer.duration
    })),
    ...habits.map(habit => ({
      type: 'habit',
      name: habit.name,
      time: habit.time,
      duration: habit.duration,
      category: habit.category
    }))
  ].sort((a, b) => a.time.localeCompare(b.time));

  const getEventColor = (event: any) => {
    if (event.type === 'prayer') return 'bg-purple-100 text-purple-800';
    const colors = {
      purpose: 'bg-emerald-100 text-emerald-800',
      amanah: 'bg-amber-100 text-amber-800',
      rizq: 'bg-blue-100 text-blue-800'
    };
    return colors[event.category as keyof typeof colors];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">Daily Schedule</h2>
          </div>
          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {allEvents.map((event, index) => (
          <div
            key={`${event.type}-${event.name}-${index}`}
            className="p-4 flex items-center space-x-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex-none w-20 text-sm text-gray-500">
              {event.time}
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${getEventColor(event)}`}>
              {event.type === 'prayer' ? '🕌' : '📝'} {event.name}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {event.duration} min
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}