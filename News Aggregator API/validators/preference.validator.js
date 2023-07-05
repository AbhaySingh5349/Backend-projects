class preferenceValidator {
  // Validate preference object
  static validatePreferenceObject(preference, preferenceList) {
    let validationResult = {
      isPreferenceIdValid: preferenceValidator.validateUniquePreferenceId(
        preference.preferenceId,
        preferenceList
      ),
      isRequiredPropertiesValid:
        preferenceValidator.validateRequiredProperties(preference),
      isCategoryListValid:
        preferenceValidator.validateInputCategories(preference),
    };

    validationResult["isValid"] =
      validationResult.isRequiredPropertiesValid &&
      validationResult.isPreferenceIdValid &&
      validationResult.isCategoryListValid;

    return validationResult;
  }

  // Validate if preference id is unique
  static validateUniquePreferenceId(preferenceId, preferenceList) {
    let validationResult = true;
    if (
      preferenceList.find(
        (preference) => preference.preferenceId === preferenceId
      )
    ) {
      validationResult = false;
    }
    return validationResult;
  }

  // Validate if required properties exists
  static validateRequiredProperties(preference) {
    let validationResult = true;

    const propertiesToValidate = ["preferenceId", "categories"];

    propertiesToValidate.forEach((prop) => {
      if (!preference.hasOwnProperty(prop)) {
        validationResult = false;
      }
    });

    return validationResult;
  }

  // Validate if categories provided falls into available categories
  static validateInputCategories(preference) {
    const expectedCategories = [
      "business",
      "entertainment",
      "general",
      "health",
      "science",
      "sports",
      "technology",
    ];

    let categories_list =
      preference?.categories == null ? [] : preference.categories;

    let validCategories = categories_list.length > 0;

    categories_list.forEach((category) => {
      if (!expectedCategories.includes(category)) {
        validCategories = false;
      }
    });
    return validCategories;
  }
}

module.exports = {
  preferenceValidator,
};
