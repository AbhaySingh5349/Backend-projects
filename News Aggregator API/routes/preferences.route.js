const express = require("express");
const preferencesController = require("../controllers/preferences.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.put(
  "/",
  authMiddleware.verifyToken,
  preferencesController.updatePreferences
);

router.get(
  "/",
  authMiddleware.verifyToken,
  preferencesController.retrievePreferences
);

module.exports = router;
