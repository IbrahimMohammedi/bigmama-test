
export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { text, max_length } = req.body;

  try {
    const response = await fetch('http://localhost:8000/api/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, max_length }),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Error summarizing text:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
