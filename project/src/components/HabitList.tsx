import { Habit } from '../types';
import { Book, Brain, Heart, Check, Clock } from 'lucide-react';

interface HabitListProps {
  habits: Habit[];
  onToggleHabit: (id: string) => void;
}

export default function HabitList({ habits, onToggleHabit }: HabitListProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'spiritual':
        return <Book className="w-5 h-5 text-purple-500" />;
      case 'health':
        return <Heart className="w-5 h-5 text-rose-500" />;
      case 'learning':
        return <Brain className="w-5 h-5 text-emerald-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  if (habits.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No habits yet</h3>
        <p className="mt-2 text-sm text-gray-500">
          Add your first habit to start tracking your spiritual journey
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
      {habits.map((habit) => (
        <div
          key={habit.id}
          className={`p-4 flex items-center justify-between transition-colors ${
            habit.completed ? 'bg-green-50' : 'hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-4">
            {getCategoryIcon(habit.category)}
            <div>
              <h3 className="font-medium text-gray-900">{habit.name}</h3>
              <p className="text-sm text-gray-500">{habit.type}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">{habit.time}</div>
              <div className="text-sm text-gray-500">{habit.duration} min</div>
            </div>

            <button
              onClick={() => onToggleHabit(habit.id)}
              className={`p-2 rounded-lg transition-colors ${
                habit.completed
                  ? 'bg-green-100 text-green-600 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              <Check className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}