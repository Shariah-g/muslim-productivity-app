import { Habit } from '../types';
import HabitList from './HabitList';
import SectionHeader from './SectionHeader';

interface SectionProps {
  title: string;
  description: string;
  habits: Habit[];
  onAddHabit: () => void;
  onToggleHabit: (id: string) => void;
}

export default function Section({ 
  title, 
  description, 
  habits, 
  onAddHabit,
  onToggleHabit 
}: SectionProps) {
  const progress = habits.length > 0
    ? Math.round((habits.filter(h => h.completed).length / habits.length) * 100)
    : 0;

  return (
    <div className="mb-8">
      <SectionHeader
        title={title}
        description={description}
        progress={progress}
        onAddHabit={onAddHabit}
      />
      <HabitList habits={habits} onToggleHabit={onToggleHabit} />
    </div>
  );
}