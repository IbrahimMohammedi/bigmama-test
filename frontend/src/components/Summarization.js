import { useState } from "react";
import { Form, Button, Alert, Row, Col} from "react-bootstrap";



const Summarization = () => {
  // Text variables
  const [text, setText] = useState("");
  const [maxLength, setMaxLength] = useState(150);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

  // HandleSummarize handles the summarize button click
const handleSummarize = async () => {
  try {
    // Set loading state to true to indicate that a request is in progress
    setLoading(true);

    // Check if the text is empty
    if (text.length === 0) {
      throw new Error("Please enter a text");
    } else if (text.length < 50) {
      // Check if the text is less than 50 characters for summarization
      throw new Error("Text must be at least 50 characters long for summarization.");
    }

    // Make a POST request to the summarization API
    const response = await fetch("http://localhost:8000/api/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, max_length: Number(maxLength) }),
    });

    // Check if the response is not OK
    if (!response.ok) {
      const errorData = await response.json();
      // Handle and throw an error with details from the API
      throw new Error(errorData.detail.error || "An error occurred");
    }

    // Clone the response before calling json() to allow reading the response again
    const data = await response.clone().json();

    // Update the state with the summary and clear any previous error
    setSummary(data.summary);
    setError("");
  } catch (error) {
    // Handle errors during the try block
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      // Handle network errors
      setError("Network error. Please check your internet connection.");
    } else {
      console.error('Error summarizing text:', error);
      // Clear the summary and set an error message
      setSummary('');
      setError(`Error: ${error.message || "An unexpected error occurred."}`);
    }
  } finally {
    // Set loading state to false when the request is complete
    setLoading(false);
  }
};

// handleTextChange handles the text input change
const handleTextChange = (e) => {
  // Update the text state with the new input value
  setText(e.target.value);
  // Show the close button if the text is not empty
  setShowCloseButton(e.target.value !== "");
};


  // JSX
return (
  <div className="container mt-5">
    <Row>
      <Col>
        <Form.Group controlId="formText">
          <Form.Label style={{ fontWeight: 'bold' }}>Text to Summarize:</Form.Label>
          <div style={{ position: 'relative'}}>
            {/* Textarea for entering the text */}
            <Form.Control
              as="textarea"
              rows={10}
              placeholder="Enter your text here . . . . ."
              value={text}
              style={{backgroundColor:'#EEEEEE'}}
              onChange={handleTextChange}
              // Handles the 'Enter' key press to trigger summarization
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault(); // Prevents adding a new line
                  handleSummarize(); // Calls your handleSummarize function
                }
              }}
            />
            {/* Close button to clear the text input */}
            {showCloseButton && (
              <span
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '22px',
                  cursor: 'pointer',
                  color: 'black',
                  fontSize: '20px',
                }}
                onClick={() => {
                  setText("");
                  setShowCloseButton(false);
                }}
              >
                X
              </span>
            )}
          </div>
        </Form.Group>
        <br />
        <Form.Group controlId="formMaxLength">
          <Form.Label style={{ fontWeight: 'bold' }}>Max Length:</Form.Label>
          {/* Input for setting the max length */}
          <Form.Control
            type="number"
            value={maxLength}
            style={{backgroundColor:'#EEEEEE'}}
            className="col-md-6"
            onChange={(e) => setMaxLength(e.target.value)}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="formText">
          <Form.Label style={{ fontWeight: 'bold' }}>Summary:</Form.Label>
          {/* Textarea for displaying the summarized text */}
          <Form.Control
            as="textarea"
            rows={10}
            disabled
            style={{backgroundColor:'#EEEEEE'}}
            placeholder="Summarized text will show here"
            value={summary}
          />
        </Form.Group>
      </Col>
    </Row>
    <br />
    <Row>
      <Col>   
        {/* Button to trigger text summarization */}
        <Button
          variant="primary"
          onClick={handleSummarize}
          disabled={loading} 
          style={{
            fontWeight: 'bold',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
          }}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </Button>
      </Col>
    </Row>
    <br />
    {/* Display error message if there is an error */}
    {error && <Alert variant="danger">{error}</Alert>}
    <br />
  </div>
  );
}


// Exporting the component
export default Summarization;
