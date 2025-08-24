// src/components/history/ViewToggle.tsx
import React from 'react';
import styles from './ViewToggle.module.css';

interface ViewToggleProps {
  currentView: 'day' | 'week';
  onToggle: (view: 'day' | 'week') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ currentView, onToggle }) => {
  return (
    <div className={styles.toggleContainer} role="radiogroup" aria-label="view toggle">
      <label className={styles.radioLabel}>
        <input
          type="radio"
          name="view"
          value="day"
          checked={currentView === 'day'}
          onChange={() => onToggle('day')}
        />
        <span>Day</span>
      </label>

      <label className={styles.radioLabel}>
        <input
          type="radio"
          name="view"
          value="week"
          checked={currentView === 'week'}
          onChange={() => onToggle('week')}
        />
        <span>Week</span>
      </label>
    </div>
  );
};

export default ViewToggle;
