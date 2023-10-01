const express = require('express');
const { chatAIResponses } = require('./getAIChatResponses.js')

const app = express();
const PORT = 3000;

app.get('/', (req, res)=> chatAIResponses(req, res))

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}...`)
})
