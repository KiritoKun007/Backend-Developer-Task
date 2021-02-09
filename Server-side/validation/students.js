const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function ValidateStudentDetails(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.subject = !isEmpty(data.subject) ? data.subject : "";
  data.marks = !isEmpty(data.marks) ? data.marks : "";

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name is required";
  }

  if (Validator.isEmpty(data.subject)) {
    errors.subject = "Subject field is required";
  }

  if(Validator.isEmpty(data.marks)) {
    errors.marks = "Mark field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
