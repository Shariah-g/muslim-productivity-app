import { useState } from 'react';
import { Lightbulb, Plus, X } from 'lucide-react';
import type { FeatureRequest } from '../types';

interface FeatureRequestsProps {
  requests: FeatureRequest[];
  onAddRequest: (request: FeatureRequest) => void;
  onUpdateStatus: (id: string, status: 'pending' | 'inProgress' | 'completed') => void;
  onDeleteRequest: (id: string) => void;
}

export default function FeatureRequests({
  requests,
  onAddRequest,
  onUpdateStatus,
  onDeleteRequest,
}: FeatureRequestsProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newRequest, setNewRequest] = useState({ title: '', description: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequest.title.trim()) return;

    onAddRequest({
      id: Date.now().toString(),
      title: newRequest.title,
      description: newRequest.description,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
    setNewRequest({ title: '', description: '' });
    setIsAdding(false);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      inProgress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
    };
    return colors[status as keyof typeof colors];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">Feature Requests</h2>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Request</span>
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={newRequest.title}
              onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
              placeholder="Feature title..."
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
            <textarea
              value={newRequest.description}
              onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
              placeholder="Feature description..."
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="p-6 space-y-4">
        {requests.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No feature requests yet. Add your first request above.
          </div>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              className="p-4 rounded-lg border border-gray-200 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{request.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{request.description}</p>
                </div>
                <button
                  onClick={() => onDeleteRequest(request.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <select
                  value={request.status}
                  onChange={(e) =>
                    onUpdateStatus(
                      request.id,
                      e.target.value as 'pending' | 'inProgress' | 'completed'
                    )
                  }
                  className={`text-sm rounded-full px-3 py-1 ${getStatusColor(request.status)}`}
                >
                  <option value="pending">Pending</option>
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <span className="text-sm text-gray-500">
                  {new Date(request.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}