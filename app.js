require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors());
app.options("*", cors());
app.use(express.json());

// Path to the routes directory
const routesPath = path.join(__dirname, "./src/routes");

// Read all files in the routes directory
fs.readdirSync(routesPath).forEach((file) => {
  const route = require(path.join(routesPath, file));

  // Assuming each route file exports a router and is used under its own endpoint
  app.use("/api", route);
});

// Handle 404 - Route not found
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found." });
});

// Handle other errors (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log("err", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log("err", err);
  res.status(401).json({ error: "Unauthorized" });
});

app.listen(process.env.APP_PORT || 1000, () => {
  console.log(`Running http://localhost:${process.env.APP_PORT || 1000}`);
});

// const OpenAI = require("openai");

// const token = process.env.AZURE_KEY;
// const endpoint = "https://models.inference.ai.azure.com";
// const modelName = "gpt-4o";

// async function main() {
//   const client = new OpenAI({ baseURL: endpoint, apiKey: token });

//   const response = await client.chat.completions.create({
//     messages: [
//       { role: "system", content: "You are a stressful assistant." },
//       {
//         role: "user",
//         content: `What is the capital of the United States?`,
//       },
//     ],
//     model: modelName,
//     temperature: 1.0,
//     max_tokens: 1000,
//     top_p: 1.0,
//   });

//   console.log(response.choices[0].message.content);
// }

// main().catch((err) => {
//   console.error("The sample encountered an error:", err);
// });
//
