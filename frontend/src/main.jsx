import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import SnapshotViewer from './pages/SnapshotViewer';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/snapshot/:sceneType" element={<SnapshotViewer />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
