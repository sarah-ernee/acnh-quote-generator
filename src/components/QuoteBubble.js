import React from "react";
import "./QuoteBubble.css";

const QuoteBubble = ({
  character = "Isabelle",
  message = " A good attitude will always take you further than a bad habit.",
  onRefreshQuote,
  darkMode,
}) => {
  const calculateFontSize = (messageLength) => {
    const minFontSize = 18;
    const maxFontSize = 32;
    const lengthThreshold = 100;

    // Calculate the new font size
    const fontSize = Math.max(
      minFontSize,
      maxFontSize - Math.max(0, messageLength - lengthThreshold) / 5
    );

    return `${fontSize}px`;
  };

  const chars = message ? message.length : 0;
  const fontSize = calculateFontSize(chars);

  return (
    <div className="dialogue">
      <div className="dialogue-blobs">
        <div className={`${darkMode ? "top-blob-dark" : "top-blob"}`}></div>
        <div
          className={`${darkMode ? "bottom-blob-dark" : "bottom-blob"}`}
        ></div>
        <div
          className={`${darkMode ? "dialogue-text-dark" : "dialogue-text"}`}
          style={{ fontSize }}
        >
          {message}
        </div>
      </div>

      <div className="dialogue-character-wrap">
        <div
          className={`${
            darkMode ? "dialogue-character-dark" : "dialogue-character"
          }`}
        >
          {character}
        </div>
      </div>

      <button className="quote-btn" onClick={onRefreshQuote}>
        New Quote
      </button>
    </div>
  );
};

export default QuoteBubble;
