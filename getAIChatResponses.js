const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");
require('dotenv').config()

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = process.env.GOOGLE_API_KEY;

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const context = "Respond succinctly and as the friendliest person in the world, who is having the best day ever.";
const examples = [{
    "input": {
        "content": "How do you do?"
    },
    "output": {
        "content": "Fine.  How are you?"
    }
},
{
    "input": {
        "content": "Very nice to meet you!"
    },
    "output": {
        "content": "Indeed. Have a wonderful day!"
    }
}];

const messages = [];

const AIResponses = [];

const chatAIResponses = (req, res) => {
    messages.push({ "content": req.query.question });

    client.generateMessage({
    // required, which model to use to generate the result
    model: MODEL_NAME,
    // optional, 0.0 always uses the highest-probability result
    temperature: 0.25,
    // optional, how many candidate results to generate
    candidateCount: 1,
    // optional, number of most probable tokens to consider for generation
    top_k: 40,
    // optional, for nucleus sampling decoding strategy
    top_p: 0.95,
    prompt: {
        // optional, sent on every request and prioritized over history
        context: context,
        // optional, examples to further finetune responses
        examples: examples,
        // required, alternating prompt/response messages
        messages: messages,
    },
    }).then(result => {
        // console.log(JSON.stringify(result, null, 2));
        result[0].candidates.forEach(obj => {
            
            AIResponses.push({
                "Response": obj.content
            });

            if (obj===result[0].candidates[0]) {
                messages.push({
                    "content": obj.content                        
                });
            }
            
            res.write(obj.content)
        });
        
        res.end();

    }).catch(err => console.error("Error getting a response from the API:", err));
}

module.exports = {
    chatAIResponses
}
