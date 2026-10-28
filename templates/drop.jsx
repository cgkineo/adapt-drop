import React from 'react';
import { classes, compile } from 'core/js/reactHelpers';

export default function Drop(props) {
  const {
    title,
    ariaLabel,
    _isOpen,
    _isVisited,
    onClick
  } = props;

  return (
    <button
      className={classes([
        title ? 'btn-text' : 'btn-icon',
        'drop__btn',
        'js-toggle-view',
        _isVisited && 'is-visited'
      ])}
      aria-expanded={_isOpen.toString()}
      aria-label={ariaLabel || null}
      onClick={onClick}
    >

      <div className="drop__btn-icon">
        <div className="icon" />
      </div>

      {title &&
      <div className="drop__btn-title">
        <div
          className="drop__btn-title-inner"
          dangerouslySetInnerHTML={{ __html: compile(title, props) }}
        />
      </div>
      }

    </button>
  );
}
