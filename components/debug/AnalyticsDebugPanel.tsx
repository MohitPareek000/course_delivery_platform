'use client';

import { useEffect, useState } from 'react';
import { X, Trash2, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';

interface AnalyticsEvent {
  id: string;
  timestamp: Date;
  eventName: string;
  properties: Record<string, any>;
}

export function AnalyticsDebugPanel() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [filter, setFilter] = useState('');
  const [userInfo, setUserInfo] = useState<{ userId?: string; email?: string } | null>(null);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    // Intercept Mixpanel track calls
    const originalMixpanel = (window as any).mixpanel;

    if (!originalMixpanel) return;

    // Store original track function
    const originalTrack = originalMixpanel.track;
    const originalIdentify = originalMixpanel.identify;
    const originalPeopleSet = originalMixpanel.people?.set;

    // Override track function
    originalMixpanel.track = function(eventName: string, properties?: Record<string, any>) {
      // Call original function
      originalTrack.call(this, eventName, properties);

      // Add to our debug panel
      const event: AnalyticsEvent = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        eventName,
        properties: properties || {},
      };

      setEvents(prev => [event, ...prev].slice(0, 100)); // Keep last 100 events

      // Auto-open panel when first event is tracked
      setIsOpen(true);
    };

    // Override identify function
    originalMixpanel.identify = function(userId: string) {
      originalIdentify.call(this, userId);
      setUserInfo(prev => ({ ...prev, userId }));
    };

    // Override people.set function
    if (originalMixpanel.people && originalPeopleSet) {
      originalMixpanel.people.set = function(properties: Record<string, any>) {
        originalPeopleSet.call(this, properties);
        if (properties.email || properties.$email) {
          setUserInfo(prev => ({
            ...prev,
            email: properties.email || properties.$email
          }));
        }
      };
    }

    // Cleanup on unmount
    return () => {
      originalMixpanel.track = originalTrack;
      originalMixpanel.identify = originalIdentify;
      if (originalMixpanel.people) {
        originalMixpanel.people.set = originalPeopleSet;
      }
    };
  }, []);

  // Only render in development
  if (process.env.NODE_ENV !== 'development') return null;

  const filteredEvents = events.filter(event =>
    event.eventName.toLowerCase().includes(filter.toLowerCase()) ||
    JSON.stringify(event.properties).toLowerCase().includes(filter.toLowerCase())
  );

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3
    });
  };

  const getEventColor = (eventName: string) => {
    if (eventName.includes('Login') || eventName.includes('Auth')) return 'bg-green-100 text-green-800 border-green-300';
    if (eventName.includes('Error')) return 'bg-red-100 text-red-800 border-red-300';
    if (eventName.includes('Button')) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (eventName.includes('Course') || eventName.includes('Module') || eventName.includes('Class')) return 'bg-purple-100 text-purple-800 border-purple-300';
    if (eventName.includes('Page View')) return 'bg-gray-100 text-gray-800 border-gray-300';
    return 'bg-yellow-100 text-yellow-800 border-yellow-300';
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 z-50"
      >
        <Eye className="w-4 h-4" />
        Analytics Debug ({events.length})
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-2xl border-2 border-gray-200 z-50 flex flex-col"
      style={{
        width: isMinimized ? '320px' : '500px',
        height: isMinimized ? 'auto' : '600px',
        maxHeight: '90vh'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <h3 className="font-bold text-sm">Analytics Debug Panel</h3>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded">{events.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded"
          >
            {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setEvents([])}
            className="p-1 hover:bg-white/20 rounded"
            title="Clear events"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded"
          >
            <EyeOff className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* User Info */}
          {userInfo && (
            <div className="p-2 bg-green-50 border-b border-green-200">
              <p className="text-xs font-semibold text-green-800">User Identified</p>
              {userInfo.userId && <p className="text-xs text-green-700">ID: {userInfo.userId}</p>}
              {userInfo.email && <p className="text-xs text-green-700">Email: {userInfo.email}</p>}
            </div>
          )}

          {/* Filter */}
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Filter events..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-3 py-1.5 text-xs border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Events List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">
                {events.length === 0 ? 'No events tracked yet' : 'No events match filter'}
              </div>
            ) : (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className={`p-2 rounded border ${getEventColor(event.eventName)}`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-semibold text-xs">{event.eventName}</p>
                    <span className="text-[10px] opacity-75">{formatTime(event.timestamp)}</span>
                  </div>
                  {Object.keys(event.properties).length > 0 && (
                    <details className="mt-1">
                      <summary className="text-[10px] cursor-pointer hover:underline">
                        Properties ({Object.keys(event.properties).length})
                      </summary>
                      <pre className="mt-1 text-[10px] bg-black/5 p-1 rounded overflow-x-auto">
                        {JSON.stringify(event.properties, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Stats Footer */}
          <div className="p-2 border-t bg-gray-50 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Total Events: {events.length}</span>
              <span>Filtered: {filteredEvents.length}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
