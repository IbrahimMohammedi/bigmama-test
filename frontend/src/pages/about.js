import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mt-5">
     <div className="text-center" style={{ fontWeight: 'bold', fontSize: '20px'}}>
      <h1>About Text Summarization: </h1>
      </div>
      <br></br>
      <div style={{  fontSize: '18px'}}>
      <p>
        Text Summarization is a web application that allows users to summarize
        large pieces of text quickly and efficiently. Simply input your text,
        specify the maximum length for the summary, and let our application do
        the rest.
      </p>
      <br></br>
      <p>
        Our summarization engine is powered by state-of-the-art natural language
        processing models from <a href="https://huggingface.co" className="highlighted-link">HugginFace</a>. providing accurate and concise summaries for your
        content.
      </p>
      <br></br>
      <p>
        Enjoy the convenience of extracting key information from lengthy texts
        with Text Summarization!
      </p>
      </div>
    </div>
  );
};

export default AboutPage;
