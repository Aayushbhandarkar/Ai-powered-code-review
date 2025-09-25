const aiService = require("../services/ai.service");


module.exports.getReview = async (req, res) => {
  try {
    const code = req.body.code;
    if (!code) return res.status(400).send("Code is required");
    
    const response = await aiService(code);
    
    // Save to history if user is logged in
    if (req.user) {
      await History.create({
        userId: req.user.id,
        code: code,
        review: response
      });
    }
    
    res.send(response);
  } catch (error) {
    console.error("AI Review error:", error);
    res.status(500).send("Error generating review");
  }
}