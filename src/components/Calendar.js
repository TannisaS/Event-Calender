import React, { useState, useEffect } from 'react';
import { getCalendarDays, formatDate } from '../utils/helpers';
import EventModal from './EventModal';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to midnight for comparison

  // Load events from localStorage on initial load
  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  // Save events to localStorage whenever events are updated
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('events', JSON.stringify(events));
    }
  }, [events]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDayClick = (date) => {
    if (date < today) {
      setErrorMessage('You cannot add events to past dates.');
      setTimeout(() => setErrorMessage(''), 3000); // Clear error message after 3 seconds
      return;
    }
    setSelectedDate(date);
    setShowModal(true); // Open the modal when a valid date is clicked
  };

  const handleDeleteEvent = (eventToDelete) => {
    const updatedEvents = events.filter(event => event !== eventToDelete);
    setEvents(updatedEvents);
  };

  const updateEvents = (newEvents) => {
    setEvents(newEvents);
  };

  const calendarDays = getCalendarDays(currentDate);

  // Filter out events for days before today
  const upcomingEvents = events.filter(event => new Date(event.date) >= today);

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const eventsForSelectedDay = events.filter(
    (event) => event.date === formatDate(selectedDate)
  );

  // Function to get category class for event dots
  const getCategoryClass = (category) => {
    switch (category) {
      case 'work':
        return 'work-event';
      case 'personal':
        return 'personal-event';
      case 'others':
        return 'other-event';
      default:
        return '';
    }
  };

  return (
    <div className="calendar-container">
      <div>
        <div className="calendar-header">
          <button onClick={handlePrevMonth} className="small-button">Previous</button>
          <span>
            {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
          </span>
          <button onClick={handleNextMonth} className="small-button">Next</button>
        </div>

        <div className="calendar-grid">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="day-of-week">{day}</div>
          ))}
          {calendarDays.map((day, index) => {
            const isToday = day.toDateString() === today.toDateString();
            const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
            const hasEvent = events.some((event) => event.date === formatDate(day));
            const isWeekend = day.getDay() === 0 || day.getDay() === 6; // Saturday or Sunday

            return (
              <div
                key={index}
                className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${
                  hasEvent ? 'has-event' : ''
                } ${day < today ? 'disabled' : ''} ${isWeekend ? 'weekend' : ''}`}
                onClick={() => handleDayClick(day)}
              >
                {day.getDate()}
                {hasEvent &&
                  events
                    .filter((event) => event.date === formatDate(day))
                    .map((event, idx) => (
                      <div
                        key={idx}
                        className={`event-dot ${getCategoryClass(event.category)}`}
                      ></div>
                    ))}
              </div>
            );
          })}
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {showModal && (
          <EventModal
            selectedDate={selectedDate}
            events={events}
            updateEvents={updateEvents}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>

      <div className="event-panel">
        <h3>Upcoming Events</h3>
        <div className="event-list">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, index) => (
              <div key={index} className="event-item">
                <p><strong>{event.name}</strong></p>
                <p>{event.start} - {event.end}</p>
                <p>{event.description}</p>
                <button onClick={() => handleDeleteEvent(event)} className="delete-button">Delete</button>
              </div>
            ))
          ) : (
            <p>No upcoming events</p>
          )}
        </div>
      </div>

      <div className="selected-day-events">
        <h4>Events for {formatDate(selectedDate)}</h4>
        {eventsForSelectedDay.length > 0 ? (
          eventsForSelectedDay.map((event, index) => (
            <div key={index} className="event-item">
              <p><strong>Name:{event.name}</strong><br></br>
                 Time:{event.start} - {event.end}<br></br>
                 Description:{event.description}<br></br>
                 Type:{event.category}</p>
              <button onClick={() => handleDeleteEvent(event)} className="delete-button">Delete</button>
            </div>
          ))
        ) : (
          <p>No events for this day.</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;
