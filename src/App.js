import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
import QuoteBubble from "./components/QuoteBubble";

export default function App() {
  const [data, setData] = React.useState(null);

  async function updateQuote() {
    try {
      const response = await fetch("https://api.quotable.io/random");

      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);
      const data = await response.json();
      setData(data);
    } catch (err) {
      console.error(err);
      setData({ content: "Oops...something went wrong" });
    }
  }

  // weird spacing between apostrophe and s - probably a html inject issue
  // bubble should grow with text received
  // control author name length
  // adjust tilt of author bubble

  useEffect(() => {
    updateQuote();
  }, []);

  if (!data) return null;

  return (
    <div className="App">
      <QuoteBubble
        character={data.author}
        message={data.content}
        onRefreshQuote={updateQuote}
      />
    </div>
  );
}
