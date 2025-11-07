import React, { useState } from 'react';

interface DevConsoleProps {
  onCommand: (command: string) => void;
}

const DevConsole: React.FC<DevConsoleProps> = ({ onCommand }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim());
      setInput('');
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-3xl bg-slate-800/90 backdrop-blur-sm border-2 border-cyan-500 rounded-lg shadow-2xl z-50 p-4">
      <h3 className="text-lg font-bold text-cyan-300 mb-2">Developer Console</h3>
      <p className="text-xs text-slate-400 mb-2">
        Commands: `addInferences [amount]`, `setinferences [amount]`, `setupgrade [id] [count]`, `completeresearch [id]`, `unlockAll`, `triggerEvent [id]`, `unlockachievements`, `addresearchpoints [amount]`
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-slate-900 text-white px-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Enter command..."
          autoFocus
        />
        <button type="submit" className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-md transition-colors">
          Execute
        </button>
      </form>
    </div>
  );
};

export default DevConsole;