const router = require("express").Router();
const axios = require('axios')
module.exports = router;

router.get("/:word", async (req, res, next) => {

    try {

        const { data } = await axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${req.params.word}?key=${process.env.dictionaryKey}`)
     
  
      res.json(data);
    } catch (err) {
      next(err);
    }
  });