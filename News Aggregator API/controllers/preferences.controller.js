const path = require("path");
let preferencesData = require("../preferences.json");
const preferencesService = require("../services/preferences.service");
const preferenceValidation = require("../validators/preference.validator");

const updatePreferences = async (req, res) => {
  if (!req.user) {
    return res.status(401).send(req.message);
  }

  let preferences_arr = preferencesData.preferences_list;
  const user_id = req.user._id;

  req.body["preferenceId"] = user_id;

  const objValidation =
    preferenceValidation.preferenceValidator.validatePreferenceObject(
      req.body,
      preferences_arr
    );
  if (!objValidation.isValid) {
    res.status(400);
    if (!objValidation.isPreferenceIdValid) {
      res.send("Invalid preference ID");
    } else if (!objValidation.isRequiredPropertiesValid) {
      res.send("Please provide fields correctly");
    } else if (!objValidation.isCategoryListValid) {
      res.send("Please provide correct set of news categories");
    }
    return res;
  }

  const idx = preferencesService.checkIdExists(preferences_arr, user_id);
  if (idx !== -1) {
    preferences_arr[idx].categories = req.body.categories;
  } else {
    preferences_arr.push(req.body);
  }

  const writePath = path.join(__dirname, "..", "preferences.json");
  let file_updated = await preferencesService.writeFileAsync(
    writePath,
    JSON.stringify(preferencesData)
  );

  if (!file_updated) {
    return res.status(500).send("failed to update preferences");
  }

  return res.status(200).send("preferences updated");
};

const retrievePreferences = async (req, res) => {
  if (!req.user) {
    return res.status(401).send(req.message);
  }

  let preferences_arr = preferencesData.preferences_list;
  const user_id = req.user._id;

  const idx = preferencesService.checkIdExists(preferences_arr, user_id);
  if (idx !== -1) {
    return res.status(200).send(preferences_arr[idx].categories);
  } else {
    return res.status(400).send("User hasn't set any preferences");
  }
};

module.exports = {
  updatePreferences,
  retrievePreferences,
};
