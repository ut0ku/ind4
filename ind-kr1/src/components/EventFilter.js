// components/EventFilter.js
import React from 'react';

const EventFilter = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'Все события', icon: '📋' },
    { key: 'upcoming', label: 'Предстоящие', icon: '⏰' },
    { key: 'past', label: 'Завершенные', icon: '✅' }
  ];

  return (
    <div className="event-filter">
      <div className="filter-buttons">
        {filters.map(filter => (
          <button
            key={filter.key}
            className={`filter-btn ${currentFilter === filter.key ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.key)}
          >
            <span className="filter-icon">{filter.icon}</span>
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventFilter;