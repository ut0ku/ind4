// components/EventList.js
import React from 'react';
import EventItem from './EventItem';

const EventList = ({ events, onDeleteEvent, currentFilter }) => {
  if (events.length === 0) {
    return (
      <div className="event-list empty">
        <div className="empty-state">
          {currentFilter === 'upcoming' && (
            <>
              <h3>Нет предстоящих событий</h3>
              <p>Все события завершены или отфильтрованы</p>
            </>
          )}
          {currentFilter === 'past' && (
            <>
              <h3>Нет завершенных событий</h3>
              <p>Завершенные события появятся здесь</p>
            </>
          )}
          {currentFilter === 'all' && (
            <>
              <h3>Пока нет событий</h3>
              <p>Добавьте первое событие используя форму слева</p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="event-list">
      <div className="events-count">
        Найдено событий: {events.length}
      </div>
      {events.map(event => (
        <EventItem 
          key={event.id} 
          event={event} 
          onDelete={onDeleteEvent}
        />
      ))}
    </div>
  );
};

export default EventList;