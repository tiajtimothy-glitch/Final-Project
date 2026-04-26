// Part 3: Styled Components
// No external .css file at all — the styles live right in this JS file as
// tagged template literals. styled.div`...` returns a real React component
// (here called QuoteBoxWrapper) that already has the styles attached.
// You then use those components in your JSX just like any other component.
//
// Before this works you'll need to install the package once:
//     npm install styled-components

import React from 'react';
import styled from 'styled-components';

const QuoteBoxWrapper = styled.div`
  background-color: #f4f1ea;
  padding: 24px 32px;
  border-radius: 12px;
  max-width: 500px;
  margin: 40px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: Georgia, "Times New Roman", serif;
`;

const QuoteText = styled.p`
  font-size: 20px;
  font-style: italic;
  color: #333;
  line-height: 1.5;
  margin: 0 0 12px 0;
`;

const QuoteAuthor = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #555;
  text-align: right;
  margin: 0;
`;

function QuoteBox() {
  return (
    <QuoteBoxWrapper>
      <QuoteText>
        "The only limit to our realization of tomorrow is our doubts of today."
      </QuoteText>
      <QuoteAuthor>- Franklin D. Roosevelt</QuoteAuthor>
    </QuoteBoxWrapper>
  );
}

export default QuoteBox;
