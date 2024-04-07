const fs = require('fs')

const books = require('../data/books.json')

const books_get = (req, res) => {
	res.render('books/index', { title: 'All Books', books })
}

const book_get = (req, res) => {
	const book = books.find(book => book.id === +req.params.id);
	if (!book) return res.status(404).render('404', { title: '404' })
	res.render('books/single', { title: book.title, book })
}

const book_create_get = (req, res) => {
	res.render('books/create', { title: "Add a new Book", book: undefined })
}

const book_create_post = (req, res) => {
	const body = {
		id: generateId(books),
		title: req.body.title,
		author: req.body.author,
		publishedDate: {
			$date: req.body.date,
		},
		genre: req.body.genre.split(','),
		rating: +req.body.rating,
	}

	books.push(body)
	res.redirect('/books');
}

const book_delete = (req, res) => {
	const bookIndex = books.findIndex(book => book.id === +req.params.id);
	if (bookIndex !== -1) {
		books.splice(bookIndex, 1);
		res.json({ redirect: '/' });
	} else {
		res.status(404).render('404', { title: '404' })
	}
}

const book_update_get = (req, res) => {
	const book = books.find(book => book.id === +req.params.id);
	if (!book) {
		res.status(404).render('404', { title: '404' })
	} else {
		res.render('books/create', { title: "Update " + book.title, book })
	}
}

const book_update = (req, res) => {
	const updatedBook = {
		title: req.body.title,
		author: req.body.author,
		publishedDate: {
			$date: req.body.date,
		},
		genre: req.body.genre.split(','),
		rating: +req.body.rating,
	}
	let index = books.findIndex(book => book.id === +req.params.id);
	if (index !== -1) {
		books[index] = { ...books[index], ...updatedBook };
		res.json({ redirect: '/' });
	} else {
		res.status(404).render('404', { title: '404' })
	}
}

function generateId(data) {
	const lastId = data.length > 0 ? data[data.length - 1].id : 0;
	return lastId + 1;
}

module.exports = {
	books_get,
	book_get,
	book_create_get,
	book_create_post,
	book_delete,
	book_update_get,
	book_update,
}