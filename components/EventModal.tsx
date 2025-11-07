import React from 'react';
import type { GameEvent, GameEventChoice } from '../types';

interface EventModalProps {
  event: GameEvent;
  onChoice: (choice: GameEventChoice) => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onChoice }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4">
      <div className="bg-slate-800 border-2 border-cyan-400 rounded-2xl shadow-2xl max-w-lg w-full p-6 text-center animate-fade-in">
        <h2 className="text-3xl font-black text-cyan-300 mb-2">{event.title}</h2>
        <p className="text-slate-300 mb-6">{event.description}</p>
        <div className="flex flex-col gap-3">
          {event.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => onChoice(choice)}
              className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default EventModal;
