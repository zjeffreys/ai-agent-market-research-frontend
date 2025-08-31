import { createRoot } from 'react-dom/client';
import React from 'react';

function Options() {
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">SGAI Options</h1>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<Options />);
