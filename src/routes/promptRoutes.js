const express = require("express");
const router = express.Router();

const { addPrompt } = require("../controllers/promptController");
const { addPromptValidator } = require("../validators/promptValidator");

router.post("/prompt", addPromptValidator, addPrompt);

module.exports = router;
