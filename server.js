const express = require('express');
const { chatAIResponses } = require('./getAIChatResponses.js')

const app = express();

app.get('/', (req, res)=> chatAIResponses(req, res))

app.listen(3000, () => {
    console.log('Listening on Port 3000...')
})
