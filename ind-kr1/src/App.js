// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import EventFilter from './components/EventFilter';

function App() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all'); // all, upcoming, past

  // Загрузка событий из localStorage при монтировании
  useEffect(() => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Сохранение событий в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // Добавление нового события
  const addEvent = (event) => {
    const newEvent = {
      id: Date.now(),
      ...event,
      createdAt: new Date().toISOString()
    };
    setEvents([newEvent, ...events]);
  };

  // Удаление события
  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  // Фильтрация событий
  const filteredEvents = events.filter(event => {
    const now = new Date();
    const eventDate = new Date(`${event.date}T${event.time}`);
    
    switch (filter) {
      case 'upcoming':
        return eventDate > now;
      case 'past':
        return eventDate < now;
      default:
        return true;
    }
  });

  return (
    <div className="App">
      <header className="app-header">
        <h1>📅 Лента событий</h1>
        <p>Добавляйте и управляйте вашими событиями</p>
      </header>
      
      <div className="app-container">
        <div className="sidebar">
          <EventForm onAddEvent={addEvent} />
        </div>
        
        <div className="main-content">
          <EventFilter currentFilter={filter} onFilterChange={setFilter} />
          <EventList 
            events={filteredEvents} 
            onDeleteEvent={deleteEvent}
            currentFilter={filter}
          />
        </div>
      </div>
    </div>
  );
}

export default App;