import React, { useEffect, useState, useCallback } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

import QuoteBubble from "./components/QuoteBubble";
import "./App.css";

export default function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const updateQuote = useCallback(() => {
    setIsLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://api.api-ninjas.com/v1/quotes?category=", {
      headers: {
        "X-Api-Key": process.env.REACT_APP_API_KEY,
      },
      signal: signal,
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(`${response.status} ${response.statusText}`);
        return response.json();
      })
      .then((data) => {
        setData(data[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error(err);
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const cleanup = updateQuote();
    return cleanup;
  }, [updateQuote]);

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
          message={isLoading ? "Loading..." : data?.quote}
          onRefreshQuote={updateQuote}
          isLoading={isLoading}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}
