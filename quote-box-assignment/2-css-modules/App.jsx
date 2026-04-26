// Part 2: CSS Modules
// Two changes vs. Part 1:
//   1. The CSS file is renamed App.module.css (the ".module" part is what
//      tells Vite/Webpack to treat it as a CSS Module).
//   2. We import it as an OBJECT — `styles` — and reference each class
//      with styles.quoteBox instead of a string literal "quote-box".
// Note: hyphenated class names (.quote-box) become awkward to access in JS
// (styles['quote-box']), so it's conventional to use camelCase here.

import React from 'react';
import styles from './App.module.css';

function QuoteBox() {
  return (
    <div className={styles.quoteBox}>
      <p className={styles.quoteText}>
        "The only limit to our realization of tomorrow is our doubts of today."
      </p>
      <p className={styles.quoteAuthor}>- Franklin D. Roosevelt</p>
    </div>
  );
}

export default QuoteBox;
