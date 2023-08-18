const express = require("express");
const router = express.Router();
const openai = require("openai");

openai.apiKey = process.env.OPENAI_API_KEY;

module.exports = router;




router.post(`/`, async (req, res) => {
  // Your OpenAI integration logic here

  console.log("REQQYY DECCCY: ", req.body)
  try {
    const word = req.body.word || "";
    const definition = req.body.definition;

    console.log("WORD DEF SERVER: ", word, definition)

    // if (adjective.trim().length === 0) {
    //   return res.status(400).json({
    //     error: {
    //       message: "Please enter an adjective.",
    //     },
    //   });
    // }

     const prompt = `Make the following sentence sound more ${adjective}:\n\n${sentence}\n\n`;

    // const completion = await openai.Completions.create({
    //   model: "text-davinci-003",
    //   prompt: prompt,
    //   temperature: 0.6,
    //   max_tokens: 1000,
    // });

    // console.log("COMPLETION: ", completion.choices[0].text);

    // res.status(200).json({ result: completion.choices[0].text });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "An error occurred." });
  }
});











// const openAI = async function (req, res) {
//   if (!configuration.apiKey) {
//     res.status(500).json({
//       error: {
//         message:
//           "OpenAI API key not configured, please follow instructions in README.md",
//       },
//     });
//     return;
//   }

//   const adjective = req.body.adjective || "";
//   const sentence = req.body.sentence;
//   if (adjective.trim().length === 0) {
//     res.status(400).json({
//       error: {
//         message:
//           "Please enter a adjective, or at least a word, though you may not get a great result",
//       },
//     });
//     return;
//   }

//   try {
//     const completion = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: generatePrompt(adjective, sentence),
//       temperature: 0.6,
//       max_tokens: 1000,
//     });
//     console.log("COMPLETION: ", completion.data);
//     res.status(200).json({ result: completion.data.choices[0].text });
//   } catch (error) {
//     // Consider adjusting the error handling logic for your use case
//     if (error.response) {
//       console.error(error.response.status, error.response.data);
//       res.status(error.response.status).json(error.response.data);
//     } else {
//       console.error(`Error with OpenAI API request: ${error.message}`);
//       res.status(500).json({
//         error: {
//           message: "An error occurred during your request.",
//         },
//       });
//     }
//   }
// };

// function generatePrompt(adjective, sentence) {
//   // const capitalizedAnimal =
//   //   animal[0].toUpperCase() + animal.slice(1).toLowerCase();
//   return `Make the following sentence sound more ${adjective}:

//   ${sentence}



// `;
// }