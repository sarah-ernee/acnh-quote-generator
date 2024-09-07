import React from "react";
import "./QuoteBubble.css";

const QuoteBubble = ({ character, message, onRefreshQuote, darkMode }) => {
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

  const chars = message.length ? message.length : 0;
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

      {/* <svg
        className="arrow"
        width="45"
        height="25"
        viewBox="0 0 45 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onRefreshQuote}
      >
        <path
          d="M22.5 25C18.0184 25 7.59473 12.6404 1.55317 4.96431C-0.122281 2.83559 1.72264 -0.179893 4.39835 0.243337C10.2831 1.17415 18.2164 2.28736 22.5 2.28736C26.7836 2.28736 34.7169 1.17415 40.6017 0.243339C43.2774 -0.17989 45.1223 2.83559 43.4468 4.96431C37.4053 12.6404 26.9816 25 22.5 25Z"
          fill="#F1AE04"
        />
      </svg> */}
      <button className="quote-btn" onClick={onRefreshQuote}>
        New Quote
      </button>
    </div>
  );
};

export default QuoteBubble;
