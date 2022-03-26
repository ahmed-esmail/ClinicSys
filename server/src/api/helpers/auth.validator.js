const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createUser": {
      return [
        body("first_name", "first_name doesnt exists").exists(),
        body("last_name", "last_name not exists").exists(),
        body(
          "phoneNumber",
          "you have to provide phone number to contact"
        ).exists(),
        body("age").exists(),
        body("gender").exists(),
        body("type").exists().isIn(["Doctor", "Receptionist", "Admin"]),
        body("password").exists(),
      ];
    }
    case "loginUser": {
      return [
        body("phone_number", "please enter phone number for login").exists(),
        body("password", "you have to enter password").exists(),
      ];
    }
  }
};
