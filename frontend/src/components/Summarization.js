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

  // handleSummarize handles the summurize button click
  const handleSummarize = async () => {
    try {
      setLoading(true);
      if (text.length === 0) {
        throw new Error("Please enter a text");
      } else if (text.length < 50) {
        throw new Error("Text must be at least 50 characters long for summarization.");
      }
      const response = await fetch("http://localhost:8000/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, max_length: Number(maxLength) }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail.error || "An error occurred");
      }
  
      const data = await response.clone().json(); // Clone the response before calling json()
  
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
  const handleTextChange = (e) => {
    setText(e.target.value);
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
              <Form.Control
                as="textarea"
                rows={10}
                placeholder="Enter your text here . . . . ."
                value={text}
                style={{backgroundColor:'#EEEEEE'}}
                onChange={handleTextChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault(); // Prevents adding a new line
                    handleSummarize(); // Calls your handleSummarize function
                  }
                }}
              />
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
          <Button variant="primary" onClick={handleSummarize} disabled={loading} 
          style={{ fontWeight: 'bold',
                  backgroundColor: 'black',
                  color: 'white',
                  border: 'none', }}>
            {loading ? "Summarizing..." : "Summarize"}
          </Button>
        </Col>
      </Row>
      <br />
      {error && <Alert variant="danger">{error}</Alert>}
      <br />
    </div>
  );
};


// Exporting the component
export default Summarization;
