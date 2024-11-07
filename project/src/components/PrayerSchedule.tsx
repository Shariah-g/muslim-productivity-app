import { Prayer } from '../types';
import { Clock, Moon, Sun } from 'lucide-react';

const defaultPrayers: Prayer[] = [
  { id: '1', name: 'Fajr', time: '05:30', duration: 30 },
  { id: '2', name: 'Dhuhr', time: '13:00', duration: 30 },
  { id: '3', name: 'Asr', time: '16:30', duration: 30 },
  { id: '4', name: 'Maghrib', time: '19:00', duration: 30 },
  { id: '5', name: 'Isha', time: '20:30', duration: 30 }
];

export default function PrayerSchedule() {
  const getPrayerIcon = (name: string) => {
    switch (name) {
      case 'Fajr':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'Isha':
        return <Moon className="w-5 h-5 text-indigo-500" />;
      default:
        return <Clock className="w-5 h-5 text-sky-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Daily Prayer Schedule</h2>
        <p className="text-sm text-gray-500 mt-1">Set your prayer times and durations</p>
      </div>
      
      <div className="divide-y divide-gray-100">
        {defaultPrayers.map((prayer) => (
          <div key={prayer.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              {getPrayerIcon(prayer.name)}
              <span className="font-medium text-gray-700">{prayer.name}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="time"
                defaultValue={prayer.time}
                className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              <select
                defaultValue={prayer.duration}
                className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value={15}>15 min</option>
                <option value={30}>30 min</option>
                <option value={45}>45 min</option>
                <option value={60}>1 hour</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}