import { useState } from 'react';
import PrayerSchedule from './components/PrayerSchedule';
import PillarCard from './components/PillarCard';
import HabitModal from './components/HabitModal';
import Notes from './components/Notes';
import FeatureRequests from './components/FeatureRequests';
import DailySchedule from './components/DailySchedule';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Habit, Note, FeatureRequest } from './types';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'purpose' | 'amanah' | 'rizq'>('purpose');
  const [habits, setHabits] = useLocalStorage<Record<string, Habit[]>>('habits', {
    purpose: [],
    amanah: [],
    rizq: []
  });
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
  const [featureRequests, setFeatureRequests] = useLocalStorage<FeatureRequest[]>('featureRequests', []);

  const handleAddHabit = (habit: Habit) => {
    setHabits(prev => ({
      ...prev,
      [habit.category]: [...prev[habit.category], habit]
    }));
    setIsModalOpen(false);
  };

  const handleToggleHabit = (id: string, category: string) => {
    setHabits(prev => ({
      ...prev,
      [category]: prev[category].map(habit =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    }));
  };

  const openModal = (category: 'purpose' | 'amanah' | 'rizq') => {
    setActiveCategory(category);
    setIsModalOpen(true);
  };

  const handleAddNote = (note: Note) => {
    setNotes(prev => [note, ...prev]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const handleAddFeatureRequest = (request: FeatureRequest) => {
    setFeatureRequests(prev => [request, ...prev]);
  };

  const handleUpdateFeatureStatus = (id: string, status: 'pending' | 'inProgress' | 'completed') => {
    setFeatureRequests(prev =>
      prev.map(request =>
        request.id === id ? { ...request, status } : request
      )
    );
  };

  const handleDeleteFeatureRequest = (id: string) => {
    setFeatureRequests(prev => prev.filter(request => request.id !== id));
  };

  const allHabits = [...habits.purpose, ...habits.amanah, ...habits.rizq];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
  <div className="flex items-center justify-center gap-3 mb-2">
    <img 
      src="/public/logo.svg" 
      alt="Shariah Productivity Logo" 
      className="h-12 w-12" // Adjust size as needed
    />
    <h1 className="text-4xl font-bold text-gray-900">
      Shariah Productivity App
    </h1>
  </div>
  <p className="text-lg text-gray-600">
    Balance your purpose, responsibilities, and sustenance
  </p>
</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <PrayerSchedule />
          <DailySchedule
            habits={allHabits}
            prayers={[
              { name: 'Fajr', time: '05:30', duration: 30 },
              { name: 'Dhuhr', time: '13:00', duration: 30 },
              { name: 'Asr', time: '16:30', duration: 30 },
              { name: 'Maghrib', time: '19:00', duration: 30 },
              { name: 'Isha', time: '20:30', duration: 30 }
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <PillarCard
            category="purpose"
            habits={habits.purpose}
            onAddHabit={() => openModal('purpose')}
            onToggleHabit={(id) => handleToggleHabit(id, 'purpose')}
          />
          <PillarCard
            category="amanah"
            habits={habits.amanah}
            onAddHabit={() => openModal('amanah')}
            onToggleHabit={(id) => handleToggleHabit(id, 'amanah')}
          />
          <PillarCard
            category="rizq"
            habits={habits.rizq}
            onAddHabit={() => openModal('rizq')}
            onToggleHabit={(id) => handleToggleHabit(id, 'rizq')}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Notes
            notes={notes}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
          />
          <FeatureRequests
            requests={featureRequests}
            onAddRequest={handleAddFeatureRequest}
            onUpdateStatus={handleUpdateFeatureStatus}
            onDeleteRequest={handleDeleteFeatureRequest}
          />
        </div>

        <HabitModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddHabit}
          category={activeCategory}
        />
      </div>
    </div>
  );
}
