export default async (req, res) => {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Extract text and max_length from the request body
  const { text, max_length } = req.body;

  try {
    // Make a POST request to the summarization API
    const response = await fetch('http://localhost:8000/api/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, max_length }),
    });

    // Parse the response from the summarization API
    const data = await response.json();

    // Return the status and data from the summarization API
    return res.status(response.status).json(data);
  } catch (error) {
    // Handle errors, log them, and return a generic error response
    console.error('Error summarizing text:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
