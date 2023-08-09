

// THIS WAS USED TO TECT MOGODB AND MAY BE USED AS REFERENCE TO INCORPORATE THAT INTO GAME
import React, { useState } from 'react';
import axios from 'axios';

const CreateRound = () => {
  const [gameName, setGameName] = useState('');
  const [roundNumber, setRoundNumber] = useState('');
  const [word, setWord] = useState('');
  const [definitions, setDefinitions] = useState([]);

  const handleAddDefinition = () => {
    setDefinitions([...definitions, '']);
  };

  const handleDefinitionChange = (index, value) => {
    const updatedDefinitions = [...definitions];
    updatedDefinitions[index] = value;
    setDefinitions(updatedDefinitions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const roundData = {
        gameName,
        roundNumber,
        word,
        definitions,
      };
      const response = await axios.post(process.env.Mongo_URL, roundData);
      console.log('Round created successfully. ROUND: ', response);
      // Reset the form
      setGameName('');
      setRoundNumber('');
      setWord('');
      setDefinitions([]);
    } catch (error) {
      console.error('Error creating round:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Game Name:
        <input
          type="text"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Round Number:
        <input
          type="text"
          value={roundNumber}
          onChange={(e) => setRoundNumber(e.target.value)}
        />
      </label>
      <br />
      <label>
        Word:
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
      </label>
      <br />
      <h4>Definitions:</h4>
      {definitions.map((definition, index) => (
        <div key={index}>
          <input
            type="text"
            value={definition}
            onChange={(e) => handleDefinitionChange(index, e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={handleAddDefinition}>
        Add Definition
      </button>
      <br />
      <button type="submit">Create Round</button>
    </form>
  );
};

export default CreateRound;