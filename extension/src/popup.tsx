import { createRoot } from 'react-dom/client';
import React from 'react';

function Popup() {
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">SGAI</h1>
      <p className="text-sm">Extension popup placeholder</p>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<Popup />);
