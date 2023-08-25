const express = require("express");
const router = express.Router();

const OpenAI = require("openai");
// openai.apiKey = process.env.OPENAI_API_KEY;
//  const openai = require("openai");
//  const Configuration = openai.Configuration

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

module.exports = router;

router.post(`/`, async (req, res) => {
  try {
    const word = req.body.word || "";
    const definition = req.body.definition;

    // const prompt = `Answer "yes" or "no": is ${definition} a valid definition of ${word}`;

    console.log("askAI route: ", word, definition);

    const prompt = `
You are a teacher and you have to determine if students are correctly defining words. 
Their definitions may not be exactly as they appear in the dictionary, 
but they have to specifically and accurately describe the word, as if they were a definition,
and demonstate that the student undersatns the word. 
They cannot be subjective or simply say something accurate about the word. 
They have to resemble the real definition. If their definition is blank(empty) or "", the answer is "no".

Definition: ${definition}
Word: ${word}

Answer only "yes" if definition meets the criteria and "no" if its anything else. Responses should only be "yes" or "no" undercase with no period.
Reply "no" if the definition is "[]".
`;

    // const completion = await openai.Completions.create({
    //   engine: "text-davinci-003", // Use "davinci" instead of "text-davinci-003"
    //   prompt: prompt,
    //   temperature: 0.6,
    //   max_tokens: 1000,
    // });
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 30,
    });

    console.log("COMPLETION: ", completion.choices[0].text);
    res.json(completion.choices[0].text);
    // res.status(200).json({ result: completion.choices[0].text });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "An error occurred." });
  }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const openai = require("openai");
// console.log("OPER AIR: ", openai)
// // Set your OpenAI API key here
// // const OPENAI_API_KEY = "your_api_key_here"; // Replace with your actual API key

// // // Create an instance of the OpenAIApi class
// const openai = new OpenAIApi({
//   key: OPENAI_API_KEY,
// });
// openai.apiKey = process.env.OPENAI_API_KEY;
// router.get("/example", async (req, res) => {
//   try {
//     const result = await openai.complete({
//       prompt: "Once upon a time",
//       max_tokens: 50,
//     });
//     console.log("OpenAI Response:", result.choices[0].text);
//     res.send(result.choices[0].text);
//   } catch (error) {
//     console.error("OpenAI Error:", error);
//     res.status(500).send("An error occurred.");
//   }
// });

// module.exports = router;

// router.post(`/`, async (req, res) => {
//   // Your OpenAI integration logic here

//   console.log("REQQYY DECCCY: ", req.body)
//   try {
//     const word = req.body.word || "";
//     const definition = req.body.definition;

//     console.log("WORD DEF SERVER: ", word, definition)

//     // if (adjective.trim().length === 0) {
//     //   return res.status(400).json({
//     //     error: {
//     //       message: "Please enter an adjective.",
//     //     },
//     //   });
//     // }

//      const prompt = `Answer "yes" or "no" : is ${definition} a valid defintion of ${word}`;

//     const completion = await openai.Completions.create({
//       model: "text-davinci-003",
//       prompt: prompt,
//       temperature: 0.6,
//       max_tokens: 1000,
//     });

//   console.log("COMPLETION: ", completion.choices[0].text);

// res.status(200).json({ result: completion.choices[0].text });
//   } catch (error) {
//     console.error("OpenAI API Error:", error);
//     res.status(500).json({ error: "An error occurred." });
//   }
// });

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
