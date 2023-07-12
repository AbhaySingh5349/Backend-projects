const expect = require("chai").expect;

const preferenceValidation = require("../../validators/preference.validator");
let preferencesData = require("../../preferences.json");
let preferences_arr = preferencesData.preferences_list;
const preference = {
  preferenceId: "64a1c668671cf6d42e91a8ce",
  categories: ["health", "science"],
};

describe("Testing preferenceValidator class", () => {
  it("1. validating preference object", (done) => {
    let responseObj =
      preferenceValidation.preferenceValidator.validatePreferenceObject(
        preference,
        preferences_arr
      );

    expect(responseObj.isValid).equal(true);
    done();
  });

  it("2. validating unique user-id in preference object", (done) => {
    let response =
      preferenceValidation.preferenceValidator.validateUniquePreferenceId(
        preference.preferenceId,
        preferences_arr
      );

    expect(response).equal(true);
    done();
  });

  it("3. validating existence of all fields in preference object", (done) => {
    delete preference["categories"];
    let response =
      preferenceValidation.preferenceValidator.validateRequiredProperties(
        preference
      );

    expect(response).equal(false);

    preference["categories"] = ["health", "science"];
    done();
  });

  it("4. validating categories list in preference object", (done) => {
    let response =
      preferenceValidation.preferenceValidator.validateInputCategories(
        preference
      );

    expect(response).equal(true);
    done();
  });
});
