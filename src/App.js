import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";

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

  useEffect(() => {
    updateQuote();
  }, []);

  if (!data) return null;

  return (
    <div className="App">
      {/* <Card style={{ width: "90%", maxWidth: "40rem" }}>
        <Card.Body> */}
      <div className="bubble">
        <blockquote className="quote">
          <p>{data.content}</p>

          <footer className="quote-footer">
            <cite title="Source Title">{data.author}</cite>
          </footer>
        </blockquote>
      </div>
      {/* </Card.Body>
        <Card.Footer> */}
      <Button className="quote-button" variant="primary" onClick={updateQuote}>
        New Quote
      </Button>
      {/* </Card.Footer>
      </Card> */}
    </div>
  );
}
