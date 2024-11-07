import { Plus } from 'lucide-react';
import ProgressBar from './ProgressBar';

interface SectionHeaderProps {
  title: string;
  description: string;
  progress: number;
  onAddHabit: () => void;
}

export default function SectionHeader({ 
  title, 
  description, 
  progress, 
  onAddHabit 
}: SectionHeaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <button
          onClick={onAddHabit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Habit</span>
        </button>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Daily Progress</span>
          <span className="text-sm font-medium text-gray-900">{progress}%</span>
        </div>
        <ProgressBar progress={progress} className="h-3" />
      </div>
    </div>
  );
}