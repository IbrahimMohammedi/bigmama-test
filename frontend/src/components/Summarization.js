import { useState } from 'react';

const Summarization = () => {
    // Text variables 
    const [text, setText] = useState('');
    const [maxLength, setMaxLength] = useState(150);
    const [summary, setSummary] = useState('');

    // handleSummarize handles the summurize button click
    const handleSummarize = async () => {
        try {
            // POST request
            const response = await fetch('/api/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Sending the request body
                body: JSON.stringify ({ text, max_lenghth: maxLength}),
            });
            // Parsing
            const data = await response.json();
            setSummary(data.summary);
        } catch (error) {
            console.error('Error summarizing the text: ', error);
        }
    };

    // JSX
    return (
        <div>
          {/* User Input*/}  
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} cols={50} />
          <br />
          {/*Max Length Input */}
          <label>
            Max length of summary:
            <input type="number" value={maxLength} onChange={(e) => setMaxLength(e.target.value)} />
            </label>
          {/* Summarize Button */}
          <button onClick={handleSummarize}>Summarize</button>
          <br />
          {/*Display Result */}
          <strong>Summary: </strong>
          <p>{summary}</p>
        </div>
    );
};

// Exporting the component
export default Summarization;