import React, { useState } from 'react';
import axios from 'axios';

const CreateRound = () => {
  const [game, setGame] = useState('');
  const [round, setRound] = useState('');
  const [definitions, setDefinitions] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the POST request to the server API endpoint
      await axios.post('http://localhost:3000/rounds', { game, round});

      // Clear the form fields
      setGame('');
      setRound('');
    //   setDefinitions('');
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
          value={game}
          onChange={(e) => setGame(e.target.value)}
        />
      </label>
      <label>
        Word:
        <input
          type="text"
          value={round}
          onChange={(e) => setRound(e.target.value)}
        />
      </label>
      {/* <label>
        Definitions:
        <input
          type="text"
          value={definitions}
          onChange={(e) => setDefinitions(e.target.value.split(','))}
        />
      </label> */}
      <button type="submit">Create Round</button>
    </form>
  );
};

export default CreateRound;


// import React, { useState } from 'react';

// const CreateRound = () => {
//   const [game, setGame] = useState('');
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