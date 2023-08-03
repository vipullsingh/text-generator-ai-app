import React, { useState } from 'react';
import axios from 'axios';

const GeneratorComponent = () => {
  const [context, setContext] = useState('');
  const [topic, setTopic] = useState('');
  const [genre, setGenre] = useState('');
  const [words, setWords] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/generate', {
        context,
        topic,
        genre,
        words: parseInt(words),
      });

      if (response.data.success) {
        setGeneratedText(response.data.data);
      } else {
        console.error('API Error:', response.data.error);
      }
    } catch (error) {
      console.error('Request Error:', error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Context:</label>
          <input type="text" value={context} onChange={(e) => setContext(e.target.value)} />
        </div>
        <div>
          <label>Topic:</label>
          <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
        </div>
        <div>
          <label>Genre:</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </div>
        <div>
          <label>Words:</label>
          <input type="number" value={words} onChange={(e) => setWords(e.target.value)} />
        </div>
        <button type="submit">Generate</button>
      </form>
      {generatedText && (
        <div>
          <h2>Generated Text:</h2>
          <p>{generatedText}</p>
        </div>
      )}
    </div>
  );
};

export default GeneratorComponent;
