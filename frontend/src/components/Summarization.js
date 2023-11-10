import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const Summarization = () => {
  // Text variables
  const [text, setText] = useState("");
  const [maxLength, setMaxLength] = useState(150);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // handleSummarize handles the summurize button click
  const handleSummarize = async () => {
    try {
      // POST request
      setLoading(true);
      const response = await fetch("http://localhost:8000/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Sending the request body
        body: JSON.stringify({ text, max_length: Number(maxLength) }),
      });
      // Parsing
      if (!response.ok) {
        // Handling non-successful response
        const errorData = await response.json();
        throw new Error(errorData.detail.error || "An error occurred");
      }

      const data = await response.json();
      setSummary(data.summary);
      setError("");
    
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        setError("Network error. Please check your internet connection.");
      } else {
        console.error('Error summarizing text:', error);
        setSummary('');
        setError(`Error: ${error.message || "An unexpected error occurred."}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // JSX
  return (
    <div className="container mt-5">
      <Form>
        <Form.Group controlId="formText">
          <Form.Label>Text to Summarize:</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <br></br>
        <Form.Group controlId="formMaxLength">
          <Form.Label>Max Length:</Form.Label>
          <Form.Control
            type="number"
            value={maxLength}
            onChange={(e) => setMaxLength(e.target.value)}
          />
        </Form.Group>
        <br></br>
        <Button variant="primary" onClick={handleSummarize} disabled={loading}>
          {loading ? "Summarizing..." : "Summarize"}
        </Button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="mt-3">
          <strong>Summary:</strong>
          <p>{summary}</p>
        </div>
      </Form>
    </div>
  );
};

// Exporting the component
export default Summarization;
