import { Book, Brain, Briefcase } from 'lucide-react';
import { categories } from '../data/categories';
import type { Habit } from '../types';
import ProgressBar from './ProgressBar';

interface PillarCardProps {
  category: 'purpose' | 'amanah' | 'rizq';
  habits: Habit[];
  onAddHabit: () => void;
  onToggleHabit: (id: string) => void;
}

export default function PillarCard({ category, habits, onAddHabit, onToggleHabit }: PillarCardProps) {
  const pillar = categories[category];
  const completedHabits = habits.filter(h => h.completed).length;
  const progress = habits.length > 0 ? (completedHabits / habits.length) * 100 : 0;

  const getPillarIcon = () => {
    switch (category) {
      case 'purpose':
        return <Book className="w-6 h-6" />;
      case 'amanah':
        return <Brain className="w-6 h-6" />;
      case 'rizq':
        return <Briefcase className="w-6 h-6" />;
    }
  };

  const getColorClasses = () => {
    const colors = {
      purpose: 'bg-emerald-500 text-emerald-50',
      amanah: 'bg-amber-500 text-amber-50',
      rizq: 'bg-blue-500 text-blue-50'
    };
    return colors[category];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className={`p-6 flex items-center justify-between ${getColorClasses()}`}>
        <div className="flex items-center space-x-3">
          {getPillarIcon()}
          <h2 className="text-xl font-semibold">{pillar.name}</h2>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-2xl font-bold text-gray-900">{completedHabits}/{habits.length}</div>
            <div className="text-sm text-gray-500">Habits Completed</div>
          </div>
          <div className="w-32">
            <ProgressBar progress={progress} />
          </div>
        </div>

        <div className="space-y-4">
          {habits.map(habit => (
            <div
              key={habit.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onToggleHabit(habit.id)}
            >
              <div>
                <div className="font-medium text-gray-900">{habit.name}</div>
                <div className="text-sm text-gray-500">{habit.time}</div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ${
                habit.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300'
              }`} />
            </div>
          ))}
        </div>

        <button
          onClick={onAddHabit}
          className="mt-6 w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Add New Habit
        </button>
      </div>
    </div>
  );
}