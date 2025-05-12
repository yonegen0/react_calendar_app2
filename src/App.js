// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Calendar from './components/calendar';
import AddPlan from './components/add_plan';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/plan" element={<AddPlan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;