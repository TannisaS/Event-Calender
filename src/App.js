import React, { useState } from 'react';
import Calendar from './components/Calendar';
import Header from './components/Header';
import './index.css';

const App = () => {
  const [events, setEvents] = useState(JSON.parse(localStorage.getItem('events')) || []);

  const updateEvents = (newEvents) => {
    setEvents(newEvents);
    localStorage.setItem('events', JSON.stringify(newEvents));
  };

  return (
    <div className="app-container">
      <Header />
      <Calendar events={events} updateEvents={updateEvents} />
    </div>
  );
};

export default App;
