// Part 1: Plain CSS
// The class names in JSX (e.g. "quote-box") must match the selectors in App.css.
// Because App.css is a regular stylesheet, those class names are GLOBAL —
// any other component that uses className="quote-box" would pick them up too.

import React from 'react';
import './App.css';

function QuoteBox() {
  return (
    <div className="quote-box">
      <p className="quote-text">
        "The only limit to our realization of tomorrow is our doubts of today."
      </p>
      <p className="quote-author">- Franklin D. Roosevelt</p>
    </div>
  );
}

export default QuoteBox;
