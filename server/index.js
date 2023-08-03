const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const generator = express.Router();
const cors = require("cors");

//OpenAI Config
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create the OpenAI instance
const openai = new OpenAIApi(configuration);

// Middleware
generator.use(express.json());
generator.use(cors());

// Route to Generate Shayari or Text or quote
generator.post('/generate', async (req, res) => {
  const { context, topic, genre, words } = req.body;
  const prompt = `Write an Hindi ${context} and It's Hinglish translation on ${topic} and ${context} should be ${genre} and should contain ${words} words`;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 3000,
    //   temperature: 0.7, // Adjust the value to control the randomness of the generated text
    });

    const data = response.data.choices[0].text;

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "There was an issue on the server",
    });
  }
});

// Create the Express app and set up routes
const app = express();
app.use('/api', generator);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
