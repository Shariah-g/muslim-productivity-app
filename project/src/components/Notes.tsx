import { useState } from 'react';
import { StickyNote, Plus, X, ChevronDown, ChevronRight } from 'lucide-react';
import type { Note } from '../types';

interface NotesProps {
  notes: Note[];
  onAddNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
}

export default function Notes({ notes, onAddNote, onDeleteNote }: NotesProps) {
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.title.trim()) return;

    onAddNote({
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      createdAt: new Date().toISOString()
    });
    setNewNote({ title: '', content: '' });
    setIsAdding(false);
  };

  const toggleNote = (id: string) => {
    setExpandedNotes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <StickyNote className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">Mental Notes</h2>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Note</span>
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              placeholder="Note title..."
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
            <textarea
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              placeholder="Note content..."
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setNewNote({ title: '', content: '' });
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                Save Note
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="divide-y divide-gray-100">
        {notes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No notes yet. Add your first note above.
          </div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="group">
              <div
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => toggleNote(note.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {expandedNotes[note.id] ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                    <h3 className="font-medium text-gray-900">{note.title}</h3>
                  </div>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm text-gray-500">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteNote(note.id);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              {expandedNotes[note.id] && (
                <div className="px-10 pb-4 text-gray-600 bg-gray-50">
                  <p className="whitespace-pre-wrap">{note.content}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}