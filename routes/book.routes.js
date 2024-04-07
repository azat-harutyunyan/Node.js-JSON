const express = require('express')
const bookController = require('../controllers/book.controller')

const router = express.Router();

router.get('/', bookController.books_get);
router.post('/', bookController.book_create_post);
router.get('/create', bookController.book_create_get);
router.get('/update/:id', bookController.book_update_get);
router.get('/:id', bookController.book_get);
router.delete('/:id', bookController.book_delete);
router.put('/:id', bookController.book_update);

module.exports = router;