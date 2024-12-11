import React, { useState, useEffect } from 'react';
import { formatDate } from '../utils/helpers';

const EventModal = ({ selectedDate, events, updateEvents, onClose }) => {
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('work');

  useEffect(() => {
    setEventName('');
    setStartTime('');
    setEndTime('');
    setDescription('');
    setCategory('work');
  }, [selectedDate]);

  const handleSubmit = () => {
    const newEvent = {
      date: formatDate(selectedDate),
      name: eventName,
      start: startTime,
      end: endTime,
      description,
      category,
    };

    const updatedEvents = [...events, newEvent];
    updateEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents)); 
    onClose();
  };

  return (
    <div className="modal">
      <h3>Events on {formatDate(selectedDate)}</h3>
      <input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="others">Others</option>
      </select>

      <button onClick={handleSubmit}>Add Event</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EventModal;
