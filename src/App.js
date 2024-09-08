import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import QuoteBubble from "./components/QuoteBubble";
import "./App.css";

import { FaMoon, FaSun } from "react-icons/fa";

export default function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  async function updateQuote() {
    setIsLoading(true);

    try {
      const response = await fetch("https://api.quotable.io/random");

      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);
      const data = await response.json();
      setData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    updateQuote();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? "dark-bg" : "light-bg"}`}>
      <button
        className={`${darkMode ? "dark-btn" : "light-btn"}`}
        onClick={toggleDarkMode}
      >
        {darkMode ? (
          <FaMoon size={20} style={{ color: "#9b8cbc" }} />
        ) : (
          <FaSun size={20} style={{ color: "#482016" }} />
        )}
      </button>
      <div className="content-row">
        <QuoteBubble
          character={isLoading ? "Loading..." : data?.author}
          message={isLoading ? "Loading..." : data?.content}
          onRefreshQuote={updateQuote}
          isLoading={isLoading}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}
