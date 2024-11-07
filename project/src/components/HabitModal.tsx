import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { categories } from '../data/categories';
import type { Habit } from '../types';

interface HabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (habit: Habit) => void;
  category: 'purpose' | 'amanah' | 'rizq';
}

export default function HabitModal({ isOpen, onClose, onSubmit, category }: HabitModalProps) {
  const [habitData, setHabitData] = useState({
    name: '',
    type: '',
    time: '',
    duration: 30
  });

  if (!isOpen) return null;

  const pillar = categories[category];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...habitData,
      id: Date.now().toString(),
      category,
      completed: false,
      progress: 0
    });
    setHabitData({ name: '', type: '', time: '', duration: 30 });
  };

  const getHeaderColor = () => {
    const colors = {
      purpose: 'bg-emerald-500',
      amanah: 'bg-amber-500',
      rizq: 'bg-blue-500'
    };
    return colors[category];
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
        <div className={`flex items-center justify-between p-6 ${getHeaderColor()} text-white`}>
          <h2 className="text-xl font-semibold">Add {pillar.name} Habit</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Habit Name
            </label>
            <input
              type="text"
              required
              value={habitData.name}
              onChange={e => setHabitData({ ...habitData, name: e.target.value })}
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter habit name..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              required
              value={habitData.type}
              onChange={e => setHabitData({ ...habitData, type: e.target.value })}
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              {pillar.types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Block
            </label>
            <div className="flex space-x-3">
              <input
                type="time"
                required
                value={habitData.time}
                onChange={e => setHabitData({ ...habitData, time: e.target.value })}
                className="flex-1 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              <select
                value={habitData.duration}
                onChange={e => setHabitData({ ...habitData, duration: Number(e.target.value) })}
                className="w-32 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value={15}>15 min</option>
                <option value={30}>30 min</option>
                <option value={45}>45 min</option>
                <option value={60}>1 hour</option>
                <option value={90}>1.5 hours</option>
                <option value={120}>2 hours</option>
                <option value={180}>3 hours</option>
                <option value={240}>4 hours</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Habit</span>
          </button>
        </form>
      </div>
    </div>
  );
}