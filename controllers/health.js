const asyncHandler = require("../middleware/async");

// @desc    Get ping
// @route   GET /api/v1/health
// @access  Public
exports.health = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Pong! I am healthy!",
  });
});
