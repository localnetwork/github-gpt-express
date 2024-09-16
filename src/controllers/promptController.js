require("dotenv").config();
const addPrompt = async (req, res) => {
  const { prompt } = req.body;
  const OpenAI = require("openai");
  const token = process.env.AZURE_KEY;
  const endpoint = "https://models.inference.ai.azure.com";
  const modelName = "gpt-4o-mini";

  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  try {
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: modelName,
      temperature: 1.0,
      max_tokens: 1000,
      top_p: 1.0,
    });

    return res
      .status(200)
      .json({ message: response.choices[0].message.content });
  } catch (error) {
    console.log("error", error);
    return res.status(error.status).json({ message: error.error.message });
  }
};

module.exports = {
  addPrompt,
};
