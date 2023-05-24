// import React, { useState } from 'react';
// import axios from 'axios';

// const CreateRound = () => {
//   const [gameName, setGameName] = useState('');
//   const [roundNumber, setRoundNumber] = useState('');
//   const [word, setWord] = useState('');
//   const [definitions, setDefinitions] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send the POST request to the server API endpoint
//       await axios.post('http://localhost:3000/rounds', { gameName, roundNumber});

//       // Clear the form fields
//       setGameName('');
//       setRoundNumber('');
//       setWord('');
//     //   setDefinitions('');
//     } catch (error) {
//       console.error('Error creating round:', error);
//     }
//   };

//   const handleGetRounds = async ()=>{
  

//     try {
//       // Send the POST request to the server API endpoint
//      const rounds = await axios.get('http://localhost:3000/rounds', { gameName, round});

//       console.log("ROUNDS: ", rounds.data)
//     } catch (error) {
//       console.error('Error get rounds round:', error);
//     }
// }

// const handleAddDefinition = () => {
//     setDefinitions([...definitions, '']);
//   };

//   const handleDefinitionChange = (index, value) => {
//     const updatedDefinitions = [...definitions];
//     updatedDefinitions[index] = value;
//     setDefinitions(updatedDefinitions);
//   };
//   return (
//     <div>
//     <form onSubmit={handleSubmit}>
//       <label>
//         Game Name:
//         <input
//           type="text"
//           value={gameName}
//           onChange={(e) => setGameName(e.target.value)}
//         />
//       </label>
//       <label>
//         Round:
//         <input
//           type="text"
//           value={roundNumber}
//           onChange={(e) => setRoundNumber(e.target.value)}
//         />
//       </label>
//       <label>
//         Word:
//         <input
//           type="text"
//           value={word}
//           onChange={(e) => setWord(e.target.value)}
//         />
//       </label>
//       {/* <label>
//         Definitions:
//         <input
//           type="text"
//           value={definitions}
//           onChange={(e) => setDefinitions(e.target.value.split(','))}
//         />
//       </label> */}
//          <h4>Definitions:</h4>
//       {definitions.map((definition, index) => (
//         <div key={index}>
//           <input
//             type="text"
//             value={definition}
//             onChange={(e) => handleDefinitionChange(index, e.target.value)}
//           />
//         </div>
//       ))}
//       <button type="button" onClick={handleAddDefinition}>
//         Add Definition
//       </button>
//       <button type="submit">Create Round</button>
//     </form>
//     <button onClick={handleGetRounds} >get rounds </button>
//     </div>
//   );
// };

// export default CreateRound;




// import React, { useState } from 'react';

// const CreateRound = () => {
//   const [game, setGameName] = useState('');
//   const [round, setRound] = useState('');
// //   const [definitions, setDefinitions] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Construct the request body
//       const requestBody = {
//         game,
//         round,
//         // definitions: definitions.split(','),
//       };

//       // Send the POST request using fetch
//       const response = await fetch('http://localhost:3000/rounds', {
//         method: 'POST',
//         mode: "no-cors",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestBody),
//       });

//       if (response.ok) {
//         console.log('Round created successfully');
//         // Clear the form fields
//         setGame('');
//         setRound('');
//         // setDefinitions('');
//       } else {
//         console.error('Error creating round:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error creating round:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Game Name:
//         <input
//           type="text"
//           value={game}
//           onChange={(e) => setGame(e.target.value)}
//         />
//       </label>
//       <label>
//         Word:
//         <input
//           type="text"
//           value={round}
//           onChange={(e) => setRound(e.target.value)}
//         />
//       </label>
//       {/* <label>
//         Definitions:
//         <input
//           type="text"
//           value={definitions}
//           onChange={(e) => setDefinitions(e.target.value)}
//         />
//       </label> */}
//       <button type="submit">Create Round</button>
//     </form>
//   );
// };

// export default CreateRound;







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

      const response = await axios.post('http://localhost:3000/rounds', roundData);

      console.log('Round created successfully');
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