const addPromptValidator = (req, res, next) => {
  let errors = [];
  const { prompt } = req.body;

  if (!prompt) {
    errors.push({
      prompt: "Prompt is required",
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};

module.exports = {
  addPromptValidator,
};
