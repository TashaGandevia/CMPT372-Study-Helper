// Application entry point.
// Mounts the React tree into the #root node defined in index.html and pulls in
// the global Tailwind stylesheet. StrictMode surfaces potential problems in dev.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
