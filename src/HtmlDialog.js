

// src/HtmlDialog.js
import React, { useRef, useEffect } from 'react';

const HtmlDialog = ({ onSubmit }) => {
  const textRef = useRef(null);

  useEffect(() => {
    // Mettre le focus sur le champ de texte lorsque le composant est monté
    if (textRef.current) {
      textRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = textRef.current.value;
    onSubmit(text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        ref={textRef}
        rows="5"
        cols="50"
      />
      <br /><br />
      <button type="submit" style={{ 
        padding: '10px 20px', 
        fontSize: '16px', 
        backgroundColor: '#4CAF50', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px', 
        cursor: 'pointer'
      }}>
        Soumettre
      </button>
    </form>
  );
};

export default HtmlDialog;

