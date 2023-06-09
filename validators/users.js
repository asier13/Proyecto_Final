const { check, param } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateUser = [
    check("name").exists().notEmpty(),
    check("email").exists().notEmpty(),
    check("password").exists().notEmpty(),
    check("age").exists().notEmpty().isInt(),
    check("city").exists().notEmpty(),
    check("interests").exists().notEmpty(),
    check("allowOffers").exists().isIn(['true', 'false']),
    (req, res, next) => {
      validateResults(req, res, next);
    },
];

const validatorLoginUser = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({ min: 8 }),
  
    (req, res, next) => {
      validateResults(req, res, next);
    },
  ];
  
const validatorNeedId = [
    param("id").notEmpty(),
  
    (req, res, next) => {
      validateResults(req, res, next);
    },
  ];
  
  module.exports = {validatorCreateUser, validatorNeedId, validatorLoginUser};
