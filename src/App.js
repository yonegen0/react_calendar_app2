// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Calendar from './components/calendar';
import AddPlan from './components/add_plan';
import { BrowserRouter } from 'react-router-dom';
import EditPlan from './components/edit_plan';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/addplan" element={<AddPlan />} />
          <Route path="/editplan" element={<EditPlan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;