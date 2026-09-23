const express = require("express");
const BookModel = require("../models/Book.model");
const {
    createBookValidation,
    handValidationErrors,
    updateBookValidation,
    idValidation
    } = require("../validators/book.validator");

const router = express.Router();

router.post(
    "/", 
    createBookValidation, handValidationErrors,
    async(req, res) => {
    try {
      const newBook = await BookModel.create(req.body);
       
      res.status(201).json(newBook);
    } catch (error) {
      res.status(400).json({message: error.message});
    }
});

router.get("/", async(req, res) => {
    try {
        const bookList = await BookModel.find();
       
      res.status(200).send(bookList);
    }catch (error) {
      res.status(400).json({message: error.message});
    }
});

router.get("/:id", idValidation, handValidationErrors, async(req, res) => {
    try {
        const { id } = req.params
        const book = await BookModel.findById(id)

         if(!book) {
            return res.status(400).json({message: req.t("bookNotFound")})

        }

      res.status(200).json(book)
    } catch (error) {
      res.status(400).json({message: error.message});

    }
})

router.delete("/:id", idValidation, handValidationErrors, async(req, res) => {
    try {
        const { id } = req.params
        const deletedBook = await BookModel.findByIdAndDelete(id)

        if(!deletedBook) {
            return res.status(400).json({message: req.t("bookNotFound")})

        }

     res.status(200).json({message: req.t("bookDeletedSuccessfully")})
    }catch (error) {
     res.status(400).json({message: error.message})

    }
})

router.put(
    "/:id", updateBookValidation, 
    handValidationErrors,
    async(req, res) => {
    try {
        const { id } = req.params;
        const updateBook = await BookModel.findByIdAndUpdate(id, req.body, { 
            new: true, 
        });

        if(!updateBook) {
            return res.status(400).json({message: req.t("bookNotFound")})
        }

     res.status(200).json({message: req.t("bookUpdatedSuccessfully"), updateBook})
    }catch (error) {
     res.status(400).json({message: error.message});

    }
})

module.exports = router