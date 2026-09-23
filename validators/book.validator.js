const { body, param, validationResult } = require("express-validator")

const createBookValidation = [
    body("bookName")
       .notEmpty()
       .withMessage((value, { req }) => req.t("bookNameRequired"))
       .isLength({ min: 5, max: 100 })
       .withMessage((value, { req }) => req.t("bookNameLengthValidation")),
   
    body("price")
       .notEmpty()
       .withMessage((value, { req }) => req.t("priceRequired"))
       .isFloat({ min: 1, max: 1000 })
       .withMessage((value, { req }) => req.t("priceValidation")),

    body("countInStock")
        .notEmpty()
        .withMessage((value, { req }) => req.t("stockRequired"))
        .isInt({ min: 1, max: 255 })
        .withMessage((value, { req }) => req.t("stockValidation")),

    body("image")
        .notEmpty()
        .withMessage((value, { req }) => req.t("imageRequired"))
        .isURL()
        .withMessage((value, { req }) => req.t("imageValidation"))
];

const updateBookValidation = [
    param("id")
        .isMongoId()
        .withMessage((value, { req }) => req.t("invalidId")),

    body("bookName")
      .optional()
      .isLength({ min: 5, max: 100 })
      .withMessage((value, { req }) => req.t("bookNameLengthValidation")),
   
    body("price")
      .optional()
      .isFloat({ min: 1, max: 1000 })
      .withMessage((value, { req }) => req.t("priceValidation")),

    body("countInStock")
        .optional()
        .isInt({ min: 1, max: 255 })
        .withMessage((value, { req }) => req.t("stockValidation")),

    body("image")
        .optional()
        .isURL()
        .withMessage((value, { req }) => req.t("imageValidation"))
];

    const idValidation = [
        param("id")
        .isMongoId()
        .withMessage((value, {req}) => req.t("bookIDValidation")),
    ];

    const handValidationErrors = (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty() ){
             return res.status(400).json({errors: errors.array()})
        }
        next()
    }

    module.exports = {
        createBookValidation,
        updateBookValidation,
        handValidationErrors,
        idValidation
    }