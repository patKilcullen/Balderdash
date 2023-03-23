const router = require('express').Router();
module.exports = router
const axios = require('axios')
require('dotenv').config();

// export const getDefinition = createAsyncThunk(
//     '/getDefinition',
//     async () => {
//       try {
//         const { data } = await axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/dog');
//    console.log("DATA : ", data)
//    console.log("DATA2 : ", data[0].meanings[0].definitions[0].definition)
//         return data;
//       } catch (error) {
//         console.log("EROR IN GET DEFINITIOM")
//         return error.message;
//       }
//     }
//   );\
// export const getMeriDefinition = createAsyncThunk(
//     '/getDefinition',
//     async (word) => {
//       console.log("WORD IN GET MERI: ", word)
//       try {
//         const { data } = await axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.dictionaryKey}`);
//         //  const { data } = await axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=3ca1a8b0-158e-4e88-b635-579bf43719f4`);
//         console.log("DATA: ", data)
  
//       } catch (error) {
//         console.log("EROR IN Get MERi DEFINITIOM")
//         return error.message;
//       }
//     }
//   );
  router.get('/:word', async (req,res,next)=>{
    // console.log("HIT THE GETMER2 ROUTE")
    try{
        // console.log("PROCESS ENV: ", process.env.dictionaryKey)
    const  {data}  = await axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${req.params.word}?key=${process.env.dictionaryKey}`);
    // console.log("DATA IN MERI ROUTE: ", data)
    const turd = [...data]
    // console.log("DATA destructured: ", turd.shortdef)
    }catch(error){
        // console.log("EROR IN Get MERi DEFINITIOM")
        next(error)
    }
  })