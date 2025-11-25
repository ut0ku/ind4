// components/EventItem.js
import React from 'react';

const EventItem = ({ event, onDelete }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      personal: '👤',
      work: '💼',
      family: '👨‍👩‍👧‍👦',
      health: '🏥',
      entertainment: '🎭'
    };
    return icons[category] || '📅';
  };

  const getCategoryName = (category) => {
    const names = {
      personal: 'Личное',
      work: 'Работа',
      family: 'Семья',
      health: 'Здоровье',
      entertainment: 'Развлечения'
    };
    return names[category] || 'Другое';
  };

  const formatDateTime = (date, time) => {
    const eventDate = new Date(`${date}T${time}`);
    const now = new Date();
    const isPast = eventDate < now;

    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };

    return {
      full: eventDate.toLocaleDateString('ru-RU', options),
      isPast,
      relative: getRelativeTime(eventDate, now)
    };
  };

  const getRelativeTime = (eventDate, now) => {
    const diff = eventDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (diff < 0) {
      return 'Завершено';
    } else if (days === 0) {
      if (hours === 0) return 'Менее часа';
      return `Через ${hours} ч.`;
    } else if (days === 1) {
      return 'Завтра';
    } else {
      return `Через ${days} д.`;
    }
  };

  const dateTimeInfo = formatDateTime(event.date, event.time);

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить это событие?')) {
      onDelete(event.id);
    }
  };

  return (
    <div className={`event-item ${dateTimeInfo.isPast ? 'past' : 'upcoming'}`}>
      <div className="event-header">
        <div className="event-category">
          <span className="category-icon">
            {getCategoryIcon(event.category)}
          </span>
          <span className="category-name">
            {getCategoryName(event.category)}
          </span>
        </div>
        <button 
          className="delete-btn"
          onClick={handleDelete}
          title="Удалить событие"
        >
          ×
        </button>
      </div>

      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        
        {event.description && (
          <p className="event-description">{event.description}</p>
        )}

        <div className="event-time">
          <div className="event-date">{dateTimeInfo.full}</div>
          <div className={`event-relative ${dateTimeInfo.isPast ? 'past' : ''}`}>
            {dateTimeInfo.relative}
          </div>
        </div>
      </div>

      <div className="event-footer">
        <span className="created-at">
          Добавлено: {new Date(event.createdAt).toLocaleDateString('ru-RU')}
        </span>
      </div>
    </div>
  );
};

export default EventItem;